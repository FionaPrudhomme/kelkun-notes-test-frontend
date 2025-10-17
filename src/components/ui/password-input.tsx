import {Eye, EyeOff} from 'lucide-react'
import * as React from 'react'

import {cn} from '@/lib/utils'

interface PasswordInputProps extends React.ComponentProps<'input'> {
}

export function PasswordInput({className, ...props}: PasswordInputProps) {
    const [visible, setVisible] = React.useState(false)

    return (
        <div className="relative">
            <input
                /* ↳ on bascule de password à text selon l'état */
                type={visible ? 'text' : 'password'}
                data-slot="input"
                className={cn(
                    'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 pr-10 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
                    'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
                    'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
                    className
                )}
                {...props}
            />

            {/* Icône œil / œil barré */}
            <button
                type="button"
                tabIndex={-1}              /* évite de casser la tab-nav principale */
                onClick={() => setVisible(v => !v)}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground hover:text-foreground focus:outline-none cursor-pointer"
            >
                {visible ? (
                    <EyeOff className="h-4 w-4" aria-label="Masquer le mot de passe"/>
                ) : (
                    <Eye className="h-4 w-4" aria-label="Afficher le mot de passe"/>
                )}
            </button>
        </div>
    )
}
