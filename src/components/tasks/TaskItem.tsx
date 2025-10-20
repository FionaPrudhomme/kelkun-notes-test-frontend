import dayjs from 'dayjs';

import {Task} from '@/services/graphql/generated/graphql';
import { StatusIndicator } from '@/components/tasks/StatusIndicator';
import UpdateTaskFormDialog from './UpdateTaskFormDialog';
import DeleteTask from './DeleteTask';
interface IProps {
  onUpdate: () => void, 
  task: Task
}

export default function TaskItem({ onUpdate, task }: IProps) {
    
  return (
    <div className="bg-gray-950 border border-gray-800 rounded-lg p-4">
        <div className="flex mb-5 items-center justify-between">
            <StatusIndicator status={task.status.name} size={30}/>
            
            <h3 className="text-lg font-semibold text-white truncate">
                {task.title}
            </h3>
          <div className='flex '>
            <UpdateTaskFormDialog onUpdate={onUpdate} taskToUpdate={task} ></UpdateTaskFormDialog>
            <DeleteTask onDelete={onUpdate} task={task}></DeleteTask>
          </div>
        </div>
        {task.description &&
          <div className="flex items-center justify-between">
            <h4 className="text-md text-white whitespace-pre-line">
                {task.description}
            </h4>
          </div>
        }
        <p className="text-sm text-gray-400 mt-2">
            Créé le{' '}
            <span className="text-gray-300">
                {dayjs(task.createdAt).format('DD MMM YYYY')}
            </span>
        </p>
      </div>
    )
}
