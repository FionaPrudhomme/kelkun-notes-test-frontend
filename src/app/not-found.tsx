'use client'

import {ArrowLeft} from 'lucide-react';
import Link from 'next/link';

import {Button} from '@/components/ui/button';

export default function NotFound() {
    return (
        <div className={'h-screen w-screen flex gap-6 items-center justify-center flex-col'}>
            <div>La page demandée n'existe pas ou plus.</div>
            <Button asChild variant={'outline'}>
                <Link href={'/'}>
                    <ArrowLeft/>
                    Revenir à l'accueil
                </Link>
            </Button>
        </div>
    )
}
