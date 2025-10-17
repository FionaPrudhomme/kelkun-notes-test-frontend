import {CheckIcon, PlusCircle} from 'lucide-react'
import {ComponentType, FunctionComponent} from 'react'

import {Badge} from '@/components/ui/badge'
import {Button} from '@/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator
} from '@/components/ui/command'
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover'
import {Separator} from '@/components/ui/separator'
import {cn} from '@/lib/utils'

interface IProps {
    className?: string
    title: string
    selectedValues: string[]
    setSelectedValues: (values: string[]) => void
    limit?: number
    limitSuffix?: string
    modal?: boolean
    options: {
        value: string
        label: string
        icon?: ComponentType<{ className?: string }>
    }[]
    buttonSize?:
        | 'default'
        | 'xs'
        | 'sm'
        | 'lg'
        | 'icon'
        | 'icon-sm'
        | 'icon-xs'
        | null
        | undefined
}

export const MultiSelect: FunctionComponent<IProps> = ({
                                                           className,
                                                           title,
                                                           selectedValues,
                                                           limit = 2,
                                                           limitSuffix = 'sélectionnés',
                                                           setSelectedValues,
                                                           options,
                                                           buttonSize = 'sm',
                                                           modal = false
                                                       }) => {
    return (
        <Popover modal={modal}>
            <PopoverTrigger asChild>
                <Button
                    variant='outline'
                    className={cn('justify-start rounded-md font-light', className)}
                >
                    <PlusCircle className='mr-2 h-4 w-4'/>
                    {title}
                    {selectedValues?.length > 0 && (
                        <>
                            <Separator orientation='vertical' className='mx-2 h-4'/>
                            <Badge
                                variant='secondary'
                                className='rounded-sm px-1 font-normal lg:hidden'
                            >
                                {selectedValues?.length}
                            </Badge>
                            <div className='hidden space-x-1 lg:flex'>
                                {selectedValues?.length > limit ? (
                                    <Badge
                                        variant='secondary'
                                        className='rounded-sm px-1 font-normal'
                                    >
                                        {selectedValues?.length} {limitSuffix}
                                    </Badge>
                                ) : (
                                    options
                                        .filter(option => selectedValues?.includes(option.value))
                                        .map(option => (
                                            <Badge
                                                variant='secondary'
                                                key={option.value}
                                                className='rounded-sm px-1 font-normal'
                                            >
                                                {option.label}
                                            </Badge>
                                        ))
                                )}
                            </div>
                        </>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className='w-[200px] p-0' align='start'>
                <Command>
                    <CommandInput placeholder={'Rechercher...'}/>
                    <CommandList>
                        <CommandEmpty>Pas de résultat trouvé.</CommandEmpty>
                        <CommandGroup>
                            {options.map(option => {
                                const isSelected = selectedValues?.includes(option.value)
                                return (
                                    <CommandItem
                                        key={option.value}
                                        onSelect={() => {
                                            if (isSelected) {
                                                setSelectedValues(
                                                    selectedValues?.filter(
                                                        value => value !== option.value
                                                    )
                                                )
                                            } else if (selectedValues?.length > 0) {
                                                setSelectedValues([...selectedValues, option.value])
                                            } else {
                                                setSelectedValues([option.value])
                                            }
                                        }}
                                        className={'cursor-pointer'}
                                    >
                                        <div
                                            className={cn(
                                                'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                                                isSelected
                                                    ? 'bg-primary text-primary-foreground'
                                                    : 'opacity-50 [&_svg]:invisible'
                                            )}
                                        >
                                            <CheckIcon className={cn('h-4 w-4')}/>
                                        </div>
                                        {option.icon && (
                                            <option.icon
                                                className={'mr-2 h-4 w-4 text-muted-foreground'}
                                            />
                                        )}
                                        <span>{option.label}</span>
                                    </CommandItem>
                                )
                            })}
                        </CommandGroup>
                        {selectedValues?.length > 0 && (
                            <>
                                <CommandSeparator/>
                                <CommandGroup>
                                    <CommandItem
                                        onSelect={() => {
                                            setSelectedValues([])
                                        }}
                                        className='justify-center text-center'
                                    >
                                        Réinitialiser
                                    </CommandItem>
                                </CommandGroup>
                            </>
                        )}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
