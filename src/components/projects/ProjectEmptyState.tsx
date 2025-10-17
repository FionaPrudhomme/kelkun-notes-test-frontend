import {FolderKanban} from 'lucide-react';

import CreateProjectFormDialog from '@/components/projects/CreateProjectFormDialog';
import {Project} from '@/services/graphql/generated/graphql';

interface IProps {
    onCreated: (project: Project) => void
}

export default function ProjectEmptyState({onCreated}: IProps) {
    return (
        <div className="flex flex-col items-center justify-center text-center h-full text-gray-400 py-16">
            <div className="bg-gray-800/40 border border-gray-700 rounded-full p-6 mb-6">
                <FolderKanban className="h-12 w-12 text-gray-500"/>
            </div>
            <h2 className="text-lg font-semibold text-white mb-2">
                Aucun projet pour le moment
            </h2>
            <p className="text-sm text-gray-400 mb-6 max-w-sm">
                Crée ton premier projet pour commencer à organiser ton travail.
            </p>
            <CreateProjectFormDialog onCreated={onCreated}/>
        </div>
    )
}
