import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useStatusStore } from '@/services/stores/statusStore';
interface IProps {
  onStatusChange: (statusId: string) => void
}

export default function FilterTaskByStatus({onStatusChange}: IProps) {
  const statusInStore = useStatusStore((state) => state.status);

  const handleSelectStatus = (statusId: string) => {
    onStatusChange(statusId) 
  }

  return (
    <div className="flex items-center justify-between gap-2 mb-6">
          <h1>Filtrer par statut : </h1>
          <Select onValueChange={handleSelectStatus} defaultValue='all'>
              <SelectTrigger
                  className="flex-1 bg-gray-900 text-gray-100 border border-gray-700 rounded-full cursor-pointer hover:bg-gray-800">
                  <SelectValue/>
              </SelectTrigger>
              <SelectContent>
                  <SelectItem value={'all'}>
                          Tous
                  </SelectItem>
                  {statusInStore?.map((status) => (
                      <SelectItem value={status.id} key={status.id}>
                          {status.name}
                      </SelectItem>
                  ))}
              </SelectContent>
          </Select>
      </div>
    )
}
