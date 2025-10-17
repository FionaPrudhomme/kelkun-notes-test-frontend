'use client'

import {Loader2} from 'lucide-react';

export default function LoadingFull() {
    return (
        <div className="h-screen w-screen flex items-center justify-center">
            <Loader2 className="animate-spin h-8 w-8"/>
        </div>
    )
}
