'use client'

import {useRouter, useParams} from 'next/navigation';

import {ExternalLink, Lightbulb} from 'lucide-react'
import Link from 'next/link'

import {Alert, AlertDescription, AlertTitle} from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import {useAuth} from '@/providers/AuthProvider'
import {useAllTasksQuery, useFindProjectByIdQuery} from '@/services/graphql/generated/graphql'
import { useProjectStore } from '@/store/projectStore';
import dayjs from 'dayjs';
import { useEffect } from 'react';

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
    const { data: tasksData, loading: tasksLoading } = useAllTasksQuery({
        variables: { dto: { projectId: projectId as string } },
        skip: !projectId,
    });

    useEffect(() => {
    if (!projectLoading && !project) {
        router.replace('/not-found');
    }
    }, [projectLoading, project, router]);

    const tasks = tasksData?.allTasks || [];

    // Rendu conditionnel
    if (projectLoading || tasksLoading) return <p>Chargement...</p>;
    if (!project) return null;



    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-semibold tracking-tight text-white">
                    {project.name}
                </h1>
                    
                <h2 className="text-xl font-semibold tracking-tight text-white">
                    Créé le{' '}
                    <span className="text-gray-300">
                        {dayjs(project.createdAt).format('DD MMM YYYY')}
                    </span>
                </h2>
            </div>
            {/* <div className="flex-1 overflow-y-auto">
                {loading ? (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400">
                        <div className="animate-pulse">Chargement des projets...</div>
                    </div>
                ) : projects.length === 0 ? (
                    <ProjectEmptyState onCreated={handleCreated}/>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {projects.map((project) => (
                            <ProjectItem project={project as Project} key={project.id}/>
                        ))}
                    </div>
                )}
            </div> */}
        </div>
    )
}
