import type {Config} from 'tailwindcss'

const config: Config = {
    content: [],

    theme: {
        extend: {
            colors: {
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                border: 'hsl(var(--border))',
                ring: 'hsl(var(--ring))',
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))'
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))'
                },
                tertiary: {
                    DEFAULT: 'hsl(var(--tertiary))',
                    foreground: 'hsl(var(--tertiary-foreground))'
                }
            }
        }
    },

    plugins: []
}

export default config
