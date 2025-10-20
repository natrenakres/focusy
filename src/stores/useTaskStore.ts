import { computed, ref, type Ref } from "vue";

export type TaskStatus = 'not_started' | 'in_progress' | 'completed'
export interface Task {
    id: string;
    title: string;
    description?: string;
    projectId?: string;
    estimatedPomodoroCount: number;
    pomodoroCount?: number;
    isActive: boolean;
    isCompleted: boolean;
    status: TaskStatus;
    type: "work" | "side" | "personal" | "none"
}



const taskList: Ref<Task[]> = ref<Task[]>([]);

export default function useTaskStore() {
    const taskCount = computed(() => taskList.value.length)

    async function createNewTask(taskData: Omit<Task, 'id' | 'status'>) {
        const newTask: Task = {
            ...taskData,
            id: `task-${Date.now()}`,
            estimatedPomodoroCount: taskData.estimatedPomodoroCount,
            pomodoroCount: taskData.pomodoroCount,
            status: "not_started"
        }

        taskList.value.push(newTask);
        return newTask;
    }

    function deleteTask(id?: string) {
        if(!id) return;
        taskList.value = taskList.value.filter(t => t.id !== id);
    }
    

    return {
        taskList,
        taskCount,
        //actions       
        createNewTask,
        deleteTask
    }
}