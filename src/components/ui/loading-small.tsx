'use client'

import {Loader2} from 'lucide-react';

export default function LoadingSmall() {
    return (
        <div className="flex items-center justify-center py-24">
            <Loader2 className="animate-spin h-8 w-8"/>
        </div>
    )
}
