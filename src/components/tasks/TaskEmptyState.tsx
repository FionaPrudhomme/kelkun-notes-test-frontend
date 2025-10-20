import {ListTodo} from 'lucide-react';

import CreateTaskFormDialog from './CreateTaskFormDialog';
import { Task } from '@/services/graphql/generated/graphql';

interface IProps {
  onCreated: (task: Task) => void, 
  projectId: string
}

export default function TaskEmptyState({onCreated, projectId}: IProps) {
    return (
        <div className="flex flex-col items-center justify-center text-center h-full text-gray-400 py-16">
            <div className="bg-gray-800/40 border border-gray-700 rounded-full p-6 mb-6">
                <ListTodo className="h-12 w-12 text-gray-500"/>
            </div>
            <h2 className="text-lg font-semibold text-white mb-2">
                Aucune Tâche pour le moment
            </h2>
            <p className="text-sm text-gray-400 mb-6 max-w-sm">
                Crée ta première tâche
            </p>
        <CreateTaskFormDialog onCreated={onCreated} projectId={projectId} />
        </div>
    )
}
