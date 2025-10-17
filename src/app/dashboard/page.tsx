'use client'

import {Code2, Database, Rocket, Wrench} from 'lucide-react'
import {useRouter} from 'next/navigation';

import {Button} from '@/components/ui/button'
import {Separator} from '@/components/ui/separator'

export default function DashboardHomePage() {
    const router = useRouter()
    return (
        <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
                <Rocket className="h-8 w-8 text-blue-500"/>
                <h1 className="text-3xl font-bold text-white tracking-tight">
                    Bienvenue sur le test Kelkun
                </h1>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
                Si tu vois cette page, c’est que tu as réussi à <strong>lancer le projet avec succès</strong> 🎉
                Félicitations&nbsp;! Tu peux maintenant passer à la partie principale du test.
            </p>
            <Separator className="my-8 bg-gray-800"/>
            <h2 className="text-2xl font-semibold text-white mb-4">🎯 Objectif global</h2>
            <p className="text-gray-300 mb-6">
                Le but du test est de compléter le module de gestion des <strong>tâches associées à un projet</strong>,
                aussi bien côté <strong>backend (NestJS)</strong> que <strong>frontend (Next.js)</strong>.
                Tu devras respecter la structure, la charte et les librairies déjà utilisées dans le projet.
            </p>
            <div className="grid sm:grid-cols-3 gap-6 mb-10">
                <div className="bg-gray-950/50 border border-gray-800 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Code2 className="h-5 w-5 text-blue-400"/>
                        <h3 className="text-white font-semibold">Frontend</h3>
                    </div>
                    <p className="text-gray-400 text-sm">
                        Utilise <strong>React Hook Form</strong>, <strong>Zod</strong> et <strong>ShadCN
                        UI</strong>{' '}
                        pour gérer la création et l’affichage des tâches.
                        Respecte le design sombre et les conventions du dashboard.
                    </p>
                </div>
                <div className="bg-gray-950/50 border border-gray-800 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Database className="h-5 w-5 text-green-400"/>
                        <h3 className="text-white font-semibold">Backend</h3>
                    </div>
                    <p className="text-gray-400 text-sm">
                        Crée le module complet <strong>Task</strong> : entity, DTO, service, resolver, queries et
                        mutations.
                        Génére et exécute la migration correspondante.
                    </p>
                </div>
                <div className="bg-gray-950/50 border border-gray-800 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Wrench className="h-5 w-5 text-yellow-400"/>
                        <h3 className="text-white font-semibold">Job planifié</h3>
                    </div>
                    <p className="text-gray-400 text-sm">
                        Mets en place un <strong>cron job</strong> (NestJS Schedule) qui s’exécute toutes les minutes
                        et archive automatiquement les tâches de plus de 15 minutes.
                    </p>
                </div>
            </div>
            <Separator className="my-8 bg-gray-800"/>
            <h2 className="text-2xl font-semibold text-white mb-4">📍 Étapes principales</h2>
            <ul className="list-disc list-inside text-gray-300 space-y-2 mb-8">
                <li>Créer le module <code>Task</code> côté backend (NestJS).</li>
                <li>Générer la migration et la synchroniser avec la base de données.</li>
                <li>Complèter la page <code>/projects/[id]</code> côté frontend.</li>
                <li>Afficher et manipuler les tâches du projet sélectionné.</li>
                <li>Configurer le job d’archivage automatique.</li>
            </ul>
            <div className="flex justify-between items-center">
                <p className="text-gray-400 text-sm">
                    Bonne chance, et n’oublie pas : un code clair et bien organisé vaut autant que la fonctionnalité ⚡️
                </p>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => router.push('/projects')}>
                    Créer mon premier projet
                </Button>
            </div>
        </div>
    )
}
