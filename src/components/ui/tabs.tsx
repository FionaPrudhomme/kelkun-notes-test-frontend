'use client'

import * as TabsPrimitive from '@radix-ui/react-tabs'
import * as React from 'react'

import {cn} from '@/lib/utils'

type TabsVariant = 'primary' | 'neutral' | 'secondary' | 'gradient' | 'simple'

type TabsProps = React.ComponentProps<typeof TabsPrimitive.Root>
type TabsListProps = React.ComponentProps<typeof TabsPrimitive.List>
type TabsContentProps = React.ComponentProps<typeof TabsPrimitive.Content>

type TabsTriggerProps = React.ComponentProps<typeof TabsPrimitive.Trigger> & {
    variant?: TabsVariant
}

const variantClasses: Record<TabsVariant, string> = {
    neutral: 'data-[state=active]:bg-background data-[state=active]:text-foreground',
    primary: 'data-[state=active]:bg-primary data-[state=active]:text-white',
    secondary: 'data-[state=active]:bg-secondary data-[state=active]:text-white',
    gradient: cn([
        'border-none',
        'data-[state=active]:bg-gradient-to-r',
        'data-[state=active]:from-purple-500',
        'data-[state=active]:to-blue-500',
        'data-[state=active]:text-white'
    ]),
    simple: cn([
        'justify-start px-3 pb-3 border-0 border-b border-b-2 rounded-none border-neutral-300 text-neutral-400 transition-colors',
        'data-[state=active]:shadow-none data-[state=active]:text-foreground data-[state=active]:border-primary data-[state=active]:text-primary'
    ])
}

function Tabs({className, ...props}: TabsProps) {
    return (
        <TabsPrimitive.Root
            data-slot="tabs"
            className={cn('flex flex-col gap-2', className)}
            {...props}
        />
    )
}

function TabsList({className, ...props}: TabsListProps) {
    return (
        <TabsPrimitive.List
            data-slot="tabs-list"
            className={cn(
                'bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]',
                className
            )}
            {...props}
        />
    )
}

function TabsTrigger({className, variant = 'neutral', ...props}: TabsTriggerProps) {
    return (
        <TabsPrimitive.Trigger
            data-slot="tabs-trigger"
            className={cn(
                'inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=\'size-\'])]:size-4 cursor-pointer',
                variantClasses[variant],
                className
            )}
            {...props}
        />
    )
}

function TabsContent({className, ...props}: TabsContentProps) {
    return (
        <TabsPrimitive.Content
            data-slot="tabs-content"
            className={cn('flex-1 outline-none', className)}
            {...props}
        />
    )
}

export {Tabs, TabsContent, TabsList, TabsTrigger}
