import {useState} from 'react'
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import {toast} from 'sonner'
import {Task, useUpdateTaskMutation} from '@/services/graphql/generated/graphql'
import { Button } from '../ui/button'
import { XIcon } from 'lucide-react'

interface IProps {
  onDelete: () => void, 
  task: Task
}

export default function DeleteTask({onDelete, task}: IProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [deleteTask, { loading }] = useUpdateTaskMutation({
      onError: (err) => toast.error(err.message),
      onCompleted: (res) => {
        toast.success('Tache supprimée avec succès')
        setIsOpen(false)
        onDelete()
      }
    });
  
  const handleSubmit = async () => {
        await deleteTask({
            variables: {
                dto: {
                    id: task.id, 
                    isArchived: true, 
                    archivedAt: new Date()
                }
            }
        })
    }
  
  
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <XIcon className='cursor-pointer'/>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Supprimer une tache</DialogTitle>
                </DialogHeader>
                <h3>Voulez-vous vraiment supprimer cette tache ?</h3>
                <DialogFooter>
                  <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsOpen(false)}
                  >
                      Annuler
                  </Button>
                  <Button
                      type="button"
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                      disabled={loading}
                      onClick={() => handleSubmit()}
                  >
                      {loading ? 'Suppression...' : 'Supprimer la tache'}
                  </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
