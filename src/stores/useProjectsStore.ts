import { ref, computed } from "vue";
import type { Task } from "./useTaskStore";


export interface Project {
    id: string;
    name: string;
    color: string;
    lastEdited: number;
    type: "work" | "side" | "personal" | "none",
    tasks: Array<Task>
}

const projectList = ref<Array<Project>>([
    {
        id: "1",
        name: 'Project Alpha',
        type: "work",
        color: "#FF5733",
        lastEdited: Date.now(),
        tasks: [
            { id: "1", title: 'Design UI mockups', status: 'completed', isActive: false, estimatedPomodoroCount: 5 },
            { id: "2", title: 'Set up database schema', status: "not_started", isActive: true, estimatedPomodoroCount: 3 },
            { id: "3", title: 'Implement authentication', status: "not_started", isActive: false, estimatedPomodoroCount: 2 },
        ]
    },
    {
        id: "2", name: 'Project Beta', type: "side", color: "#33FF57", lastEdited: Date.now(), tasks: [
            { id: "1", title: 'Research market trends', status: 'completed', isActive: false, estimatedPomodoroCount: 4 },
            { id: "2", title: 'Develop marketing strategy', status: "not_started", isActive: false, estimatedPomodoroCount: 2 },
        ]
    },
    {
        id: "3", name: 'Project Gamma', type: "personal", color: "#5733FF", lastEdited: Date.now(), tasks: [
            { id: "1", title: 'Create project plan', status: 'completed', isActive: false, estimatedPomodoroCount: 3 },
            { id: "2", title: 'Assemble project team', status: 'completed', isActive: false, estimatedPomodoroCount: 2 },
            { id: "3", title: 'Launch initial campaign', status: "not_started", isActive: false, estimatedPomodoroCount: 5 },
        ]
    },
]);

// selected project state
const selectedProjectId = ref<string | null>(projectList.value[0]?.id ?? null);
const selectedProject = computed(() => projectList.value.find(p => p.id === selectedProjectId.value) ?? null);
function setSelectedProject(id: string) { selectedProjectId.value = id; }

export function useProjectsStore() {

    return {
        projectList,
        selectedProjectId,
        selectedProject,
        setSelectedProject
    }
}