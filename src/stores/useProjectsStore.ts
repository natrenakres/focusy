import { ref, computed } from "vue";
import type { Task } from "./useTaskStore";
import { useStorage } from "@vueuse/core";

export type ProjectType = "work" | "side" | "personal" | "none";

export interface Project {
    id: string;
    name: string;
    color: string;
    lastEdited: number;
    type: ProjectType;
    tasks: Array<Task>
}

const projectList = useStorage<Array<Project>>("focusy:projects", []);

const selectedProjectId = ref<string | null>(projectList.value[0]?.id ?? null);
const selectedProject = computed(() => projectList.value.find(p => p.id === selectedProjectId.value) ?? null);
function setSelectedProject(id: string) { selectedProjectId.value = id; }

export function useProjectsStore() {

    function deleteTaskFromProject(taskId?: string) {
        if(!taskId || !selectedProject.value) return;

        selectedProject.value.tasks = selectedProject.value.tasks.filter(t => t.id !== taskId);
        
    }

    function createNewProject(projectData: Omit<Project, 'id' | 'lastEdited' | 'tasks'>) {
        const newProject: Project = {
            ...projectData,
            id: `project-${Date.now()}`,
            lastEdited: Date.now(),
            tasks: []
        }

        projectList.value.push(newProject);
        selectedProjectId.value = newProject.id;        
        return newProject;
    }

    function addTaskToProject(taskData: Omit<Task, 'id' | 'status'>) {        
        if(!selectedProject.value) return null;
        
        const newTask: Task = {
            ...taskData,
            id: `task-${Date.now()}`,
            status: "not_started",
            isActive: false
        }

        selectedProject.value.tasks.push(newTask);
        return newTask;
    }

    return {
        projectList,
        selectedProjectId,
        selectedProject,
        setSelectedProject,
        deleteTaskFromProject,
        createNewProject,
        addTaskToProject
    }
}