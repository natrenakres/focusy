import { ref, computed } from "vue";
import type { Task } from "./useTaskStore";
import { useStorage } from "@vueuse/core";

export const projectTypes = ["work", "side", "personal", "none"] as const;
export type ProjectType = typeof projectTypes[number];
export type ProjectStatus = "in_progress" | "completed";

export interface Project {
    id: string;
    name: string;
    color: string;
    lastEdited: number;
    type: ProjectType;
    status: ProjectStatus;
    tasks: Array<Task>
}

const projectList = useStorage<Array<Project>>("focusy:projects", []);

function normalizeTask(task: Task): Task {
    return {
        ...task,
        pomodoroCount: task.pomodoroCount ?? 0,
        isActive: task.isActive ?? false,
    };
}

function normalizeProject(project: Project): Project {
    return {
        ...project,
        status: project.status ?? "in_progress",
        tasks: (project.tasks ?? []).map(normalizeTask),
    };
}

projectList.value = projectList.value.map(normalizeProject);

const selectedProjectId = ref<string | null>(projectList.value[0]?.id ?? null);
const selectedProject = computed(() => projectList.value.find(p => p.id === selectedProjectId.value) ?? null);
function setSelectedProject(id: string | null) { selectedProjectId.value = id; }

export function useProjectsStore() {
    const inProgressProjects = computed(() => projectList.value.filter((project) => project.status === "in_progress"));

    const selectedProjectTotals = computed(() => {
        const tasks = selectedProject.value?.tasks ?? [];
        const totalEstimatedPomodoros = tasks.reduce((sum, task) => sum + task.estimatedPomodoroCount, 0);
        const totalActualPomodoros = tasks.reduce((sum, task) => sum + task.pomodoroCount, 0);
        return {
            totalEstimatedPomodoros,
            totalActualPomodoros,
        };
    });

    const selectedProjectProgress = computed(() => {
        const { totalEstimatedPomodoros, totalActualPomodoros } = selectedProjectTotals.value;
        if (totalEstimatedPomodoros === 0) {
            return 0;
        }

        const cappedActual = Math.min(totalActualPomodoros, totalEstimatedPomodoros);
        return (cappedActual / totalEstimatedPomodoros) * 100;
    });

    const isSelectedProjectCompletable = computed(() => {
        const tasks = selectedProject.value?.tasks ?? [];
        return tasks.length > 0 && tasks.every((task) => task.status === "completed");
    });

    const canShowProjectCompletedButton = computed(() => (
        selectedProject.value?.status === "in_progress" && isSelectedProjectCompletable.value
    ));

    function deleteTaskFromProject(taskId?: string) {
        if(!taskId || !selectedProject.value) return;

        selectedProject.value.tasks = selectedProject.value.tasks.filter(t => t.id !== taskId);
        
    }   

    function createNewProject(projectData: Pick<Project, "name" | "color" | "type">) {
        const newProject: Project = {
            ...projectData,
            id: `project-${Date.now()}`,
            lastEdited: Date.now(),
            status: "in_progress",
            tasks: []
        }

        projectList.value.push(newProject);
        selectedProjectId.value = newProject.id;        
        return newProject;
    }    

    function deleteProject(id?: string) {
        if(!id)
            return;

        const updated = projectList.value.filter(p => p.id !== id);
        projectList.value = updated;
    }

    function addTaskToProject(taskData: Omit<Task, 'id' | 'status'>) {        
        if(!selectedProject.value) return null;
        
        const newTask: Task = {
            ...taskData,
            id: `task-${Date.now()}`,
            status: "not_started",
            isActive: false,
            pomodoroCount: taskData.pomodoroCount ?? 0,
        }

        selectedProject.value.tasks.push(newTask);
        return newTask;
    }

    function setActiveTask(taskId: string) {
        if(!selectedProject.value) return;

        selectedProject.value.tasks = selectedProject.value.tasks.map((task) => ({
            ...task,
            isActive: task.id === taskId,
        }));
    }

    function incrementActiveTaskPomodoro(projectId: string): boolean {
        const project = projectList.value.find((item) => item.id === projectId);
        if(!project) return false;

        const activeTask = project.tasks.find((task) => task.isActive && task.status !== "completed");
        if(!activeTask) return false;

        activeTask.pomodoroCount += 1;
        return true;
    }

    function markProjectCompleted(projectId: string) {
        const project = projectList.value.find((item) => item.id === projectId);
        if (!project) return;

        const canComplete = project.tasks.length > 0 && project.tasks.every((task) => task.status === "completed");
        if (!canComplete) return;

        project.status = "completed";
        project.lastEdited = Date.now();
        project.tasks = project.tasks.map((task) => ({ ...task, isActive: false }));
    }

    function importProjectFormFile(fileMIME: string, data?: string | ArrayBuffer | Blob) {
        if(data && typeof data === "string" && fileMIME === "application/json")   {
            projectList.value = JSON.parse(data).map(normalizeProject);
            selectedProjectId.value = projectList.value[0]?.id ?? null;
        }

    }

    return {
        projectList,
        selectedProjectId,
        selectedProject,
        setSelectedProject,
        deleteTaskFromProject,
        createNewProject,
        deleteProject,
        addTaskToProject,
        importProjectFormFile,
        setActiveTask,
        incrementActiveTaskPomodoro,
        selectedProjectTotals,
        selectedProjectProgress,
        inProgressProjects,
        isSelectedProjectCompletable,
        canShowProjectCompletedButton,
        markProjectCompleted,
    }
}
