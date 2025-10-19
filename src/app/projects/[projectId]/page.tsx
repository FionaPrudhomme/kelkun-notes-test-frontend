'use client'

import {useRouter, useParams} from 'next/navigation';

import {Status, Task, useAllStatusQuery, useAllTasksQuery, useFindProjectByIdQuery} from '@/services/graphql/generated/graphql'
import { useProjectStore } from '@/services/stores/projectStore';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import CreateTaskFormDialog from '@/components/tasks/CreateTaskFormDialog';
import TaskItem from '@/components/tasks/TaskItem';
import TaskEmptyState from '@/components/tasks/TaskEmptyState'
import { useStatusStore } from '@/services/stores/statusStore';

export default function ProjectDetailPage() {
    const router = useRouter();
    const { projectId } = useParams();

    const projectInStore = useProjectStore((state) => state.selectedProject);

    const { data: projectData, loading: projectLoading } = useFindProjectByIdQuery({
        variables: { dto: { id: projectId as string } },
        skip: !!projectInStore,
    });

    const project = projectInStore ?? projectData?.findProjectById;

    // Toujours appeler les hooks, même si project est null
    const { data: tasksData, loading: tasksLoading, refetch: refetchTasks } = useAllTasksQuery({
        variables: { dto: { projectId: projectId as string } },
        skip: !projectId,
    });

     const { status, setStatus } = useStatusStore();

    const { data: statusData, loading : loadingStatus } = useAllStatusQuery({
        skip: status.length > 0, // évite l’appel si déjà en cache
    });

    useEffect(() => {
        if (statusData?.allStatus && status.length === 0) {
            const statusList = statusData.allStatus as Status[]; 
            setStatus(statusList);
        }
    }, [statusData, status.length, setStatus]);

    useEffect(() => {
    if (!projectLoading && !project) {
        router.replace('/not-found');
    }
    }, [projectLoading, project, router]);

    const tasks = tasksData?.allTasks || [];

    if (projectLoading && loadingStatus && status.length === 0) return <p>Chargement...</p>;
    if (!project) return null;

    const handleTaskChange = async () => {
        await refetchTasks(); 
    }

    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-semibold tracking-tight text-white">
                    {project.name}
                </h1>
                <CreateTaskFormDialog onCreated={handleTaskChange} projectId={projectId as string} />
                <h2 className="text-xl font-semibold tracking-tight text-white">
                    Créé le{' '}
                    <span className="text-gray-300">
                        {dayjs(project.createdAt).format('DD MMM YYYY')}
                    </span>
                </h2>
            </div>
            <div className="flex-1 overflow-y-auto">
                {tasksLoading ? (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400">
                        <div className="animate-pulse">Chargement des taches...</div>
                    </div>
                ) : tasks.length === 0 ? (
                        <TaskEmptyState onCreated={handleTaskChange} projectId={projectId as string} />
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {tasks.map((task) => (
                            <TaskItem task={task as Task} key={task.id} onUpdate={handleTaskChange} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
