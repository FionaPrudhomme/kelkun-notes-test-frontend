'use client'

import {useRouter, useParams} from 'next/navigation';

import {Status, Task, useAllStatusQuery, useAllTasksQuery, useFindProjectByIdQuery} from '@/services/graphql/generated/graphql'
import { useProjectStore } from '@/services/stores/projectStore';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import CreateTaskFormDialog from '@/components/tasks/CreateTaskFormDialog';
import TaskItem from '@/components/tasks/TaskItem';
import TaskEmptyState from '@/components/tasks/TaskEmptyState'
import { useStatusStore } from '@/services/stores/statusStore';
import FilterTaskByStatus from '@/components/tasks/FilterTaskByStatus';

export default function ProjectDetailPage() {
    const router = useRouter();
    const { projectId } = useParams();
    const projectInStore = useProjectStore((state) => state.selectedProject);
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
    const { status, setStatus } = useStatusStore();

    const { data: projectData, loading: projectLoading } = useFindProjectByIdQuery({
        variables: { dto: { id: projectId as string } },
        skip: !!projectInStore,
    });

    const project = projectInStore ?? projectData?.findProjectById;

    const { data: tasksData, loading: tasksLoading, refetch: refetchTasks } = useAllTasksQuery({
        variables: { dto: { projectId: projectId as string } },
        skip: !projectId,
    });

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

    const filteredTasks = selectedStatus
    ? tasks.filter((task) => task.status.id === selectedStatus)
    : tasks;

    const handleTaskChange = async () => {
        await refetchTasks(); 
    }

    const handleStatusChange = async (statusId: string) => {
        setSelectedStatus(statusId === 'all' ? null : statusId);
    }

    return (
        <div className="flex flex-col h-full">
            <div className="flex max-sm:flex-col max-sm:gap-6 items-center justify-between mb-6">
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
            <div className="flex items-center justify-between mb-6">
                <FilterTaskByStatus onStatusChange={handleStatusChange}/>
                
            </div>
            <div className="flex-1 overflow-y-auto">
                {tasksLoading ? (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400">
                        <div className="animate-pulse">Chargement des taches...</div>
                    </div>
                ) : filteredTasks.length === 0 ? (
                        <TaskEmptyState onCreated={handleTaskChange} projectId={projectId as string} />
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredTasks.map((task) => (
                            <TaskItem task={task as Task} key={task.id} onUpdate={handleTaskChange} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
