import dayjs from 'dayjs';
import {useRouter} from 'next/navigation';

import {Project} from '@/services/graphql/generated/graphql';

interface IProps {
    project: Project
}

export default function ProjectItem({project}: IProps) {
    const router = useRouter()
    return (
        <div
            onClick={() => router.push(`/projects/${project.id}`)}
            className="bg-gray-950 border border-gray-800 rounded-lg p-4 hover:bg-gray-900 transition-colors cursor-pointer">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white truncate">
                    {project.name}
                </h3>
            </div>
            <p className="text-sm text-gray-400 mt-2">
                Créé le{' '}
                <span className="text-gray-300">
                    {dayjs(project.createdAt).format('DD MMM YYYY')}
                </span>
            </p>
        </div>
    )
}
