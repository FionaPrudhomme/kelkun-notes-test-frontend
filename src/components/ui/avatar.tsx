import * as AvatarPrimitive from '@radix-ui/react-avatar'
import Image from 'next/image'
import * as React from 'react'

import {cn} from '@/lib/utils'

interface AvatarImageProps {
    src?: string
    alt?: string
    className?: string
}

export function AvatarImage(props: AvatarImageProps) {
    return null
}

interface AvatarFallbackProps {
    className?: string
    children?: React.ReactNode
}

export function AvatarFallback(props: AvatarFallbackProps) {
    return null
}

interface AvatarProps
    extends React.ComponentProps<typeof AvatarPrimitive.Root> {
    children: React.ReactNode
}

export function Avatar({children, className, ...props}: AvatarProps) {
    const [errored, setErrored] = React.useState(false)

    // 1) on transforme en tableau et on ne garde que les ReactElement
    const childArray = React.Children.toArray(children).filter(
        React.isValidElement
    ) as React.ReactElement[]

    // 2) on cherche l'AvatarImage et AvatarFallback
    const imgChild = childArray.find(c => c.type === AvatarImage) as
        | React.ReactElement<AvatarImageProps>
        | undefined

    const fallbackChild = childArray.find(c => c.type === AvatarFallback) as
        | React.ReactElement<AvatarFallbackProps>
        | undefined

    // 3) extrait ce dont on a besoin
    const src = imgChild?.props.src
    const alt = imgChild?.props.alt ?? ''
    const imgCl = imgChild?.props.className
    const showFallback = !src || errored

    return (
        <AvatarPrimitive.Root
            data-slot="avatar"
            className={cn(
                'relative items-center flex overflow-hidden rounded-full bg-muted',
                className
            )}
            {...props}
        >
            {/* 4) si on a une URL et pas d’erreur, on rend l’image */}
            {!showFallback && (
                <Image
                    src={src!}
                    alt={alt}
                    fill
                    sizes="100%"
                    style={{objectFit: 'cover'}}
                    className={cn('relative', imgCl)}
                    onError={() => setErrored(true)}
                />
            )}

            {/* 5) sinon, on affiche directement ce qui était dans AvatarFallback */}
            {showFallback && fallbackChild && (
                <span
                    data-slot="avatar-fallback"
                    className={cn(
                        'flex h-full w-full items-center justify-center',
                        fallbackChild.props.className
                    )}
                >
          {fallbackChild.props.children}
        </span>
            )}
        </AvatarPrimitive.Root>
    )
}
