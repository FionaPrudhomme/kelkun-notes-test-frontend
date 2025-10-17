'use client'

import {ExternalLink, Lightbulb} from 'lucide-react'
import Link from 'next/link'

import {Alert, AlertDescription, AlertTitle} from '@/components/ui/alert'
import {Separator} from '@/components/ui/separator'

export default function ProjectPage() {
    return (
        <div className="max-w-4xl">
            <h2 className="text-2xl font-semibold text-white mb-4">🧩 Gestion des tâches du projet</h2>
            <p className="text-gray-300 mb-3">
                Si tu es ici, c’est que tu as réussi à créer ton premier projet 🎉
                L’objectif maintenant est de mettre en place le <strong>module complet de gestion des tâches</strong>,
                côté backend et frontend.
            </p>
            <Alert className="text-gray-300 mb-6 rounded-sm">
                <AlertDescription>
                    👉 Remplace le contenu de cette page par ta propre implémentation pour répondre à l’exercice.
                </AlertDescription>
            </Alert>

            <Separator className="my-8 bg-gray-800"/>

            {/* BACKEND */}
            <h3 className="text-xl font-semibold text-white mb-4">⚙️ Backend (NestJS + GraphQL)</h3>
            <ul className="list-disc list-inside text-gray-300 space-y-2 mb-8">
                <li>Créer une <code>Task</code> entity liée à <code>Project</code> (relation OneToMany).</li>
                <li>Créer les <strong>DTO</strong>, <strong>service</strong> et <strong>resolver</strong> associés.</li>
                <li>Créer les <strong>queries et mutations GraphQL</strong> suivantes :
                    <ul className="list-disc list-inside ml-6 mt-1 space-y-1">
                        <li><code>project(id: ID!)</code> – retourne un projet avec ses tâches.</li>
                        <li><code>createTask(dto: CreateTaskInput!)</code> – crée une nouvelle tâche.</li>
                        <li><code>updateTask(dto: UpdateTaskInput!)</code> – met à jour une tâche (titre, description,
                            statut, etc.).
                        </li>
                    </ul>
                </li>
                <li>Générer et exécuter la migration correspondante avec TypeORM.</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-4">⏰ Job Cron (NestJS)</h3>
            <ul className="list-disc list-inside text-gray-300 space-y-2 mb-8">
                <li>Créer un job avec <code>@nestjs/schedule</code> exécuté <strong>toutes les minutes</strong>.</li>
                <li>Ce job doit archiver les tâches créées depuis plus de 15 minutes.</li>
                <li>Tu peux utiliser un champ <code>isArchived: boolean</code> ou une date <code>archivedAt</code>.</li>
            </ul>

            <div className="bg-gray-950/50 border border-gray-800 rounded-lg p-4 mb-8">
                <p className="text-gray-400 mb-2">📚 Documentation utile :</p>
                <ul className="space-y-1 text-blue-400 text-sm">
                    <li>
                        <Link
                            href="https://docs.nestjs.com/techniques/task-scheduling"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 hover:underline"
                        >
                            NestJS – Task Scheduling <ExternalLink className="h-3 w-3"/>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="https://docs.nestjs.com/graphql/resolvers"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 hover:underline"
                        >
                            NestJS – GraphQL Resolvers <ExternalLink className="h-3 w-3"/>
                        </Link>
                    </li>
                </ul>
            </div>

            <Separator className="my-8 bg-gray-800"/>

            {/* FRONTEND */}
            <h3 className="text-xl font-semibold text-white mb-4">🖥️ Frontend (Next.js + ShadCN)</h3>
            <p className="text-gray-300 mb-4">
                Tu vas maintenant afficher et manipuler les tâches d’un projet côté frontend.
                Tout doit s’intégrer naturellement dans le style visuel du dashboard existant (thème sombre).
            </p>

            <ul className="list-disc list-inside text-gray-300 space-y-2 mb-8">
                <li>Afficher le <strong>nom du projet</strong> et la <strong>date de création</strong>.</li>
                <li>Afficher la <strong>liste des tâches</strong> récupérées via l’API GraphQL.</li>
                <li>Afficher pour chaque tâche : le titre, la description, la date de création et son statut.</li>
                <li>Afficher les statuts avec des <strong>badges colorés</strong> (ex : gris = À faire, jaune = En
                    cours, vert = Terminé).
                </li>
                <li>Gérer un <strong>empty state</strong> s’il n’y a encore aucune tâche.</li>
            </ul>

            <Separator className="my-8 bg-gray-800"/>

            <h3 className="text-xl font-semibold text-white mb-4">📋 Modales et formulaires</h3>
            <p className="text-gray-300 mb-4">
                Crée une modale <code>CreateTaskFormDialog</code> permettant d’ajouter une nouvelle tâche.
                Elle doit utiliser <strong>React Hook Form</strong> + <strong>Zod</strong> pour la validation.
            </p>

            <ul className="list-disc list-inside text-gray-300 space-y-2 mb-8">
                <li>Le formulaire doit contenir les champs : <code>title</code>, <code>description</code>, et
                    éventuellement <code>status</code>.
                </li>
                <li>Utilise les composants ShadCN :
                    <ul className="list-disc list-inside ml-6 mt-1 space-y-1">
                        <li><code>Dialog</code> pour la modale,</li>
                        <li><code>Form</code>, <code>FormField</code>, <code>Input</code> pour les champs,</li>
                        <li><code>Button</code> pour la soumission et l’annulation.</li>
                    </ul>
                </li>
                <li>À la soumission, appelle la mutation <code>createTask</code> et ferme la modale si la création est
                    réussie.
                </li>
            </ul>

            <p className="text-gray-300 mb-8">
                Crée également une modale ou un composant d’édition (ex : <code>UpdateTaskFormDialog</code>) pour
                modifier le titre ou la description d’une tâche existante.
            </p>

            <Separator className="my-8 bg-gray-800"/>

            <h3 className="text-xl font-semibold text-white mb-4">⚡ Intégration GraphQL côté front</h3>
            <p className="text-gray-300 mb-4">
                Toutes les définitions GraphQL côté frontend se trouvent dans :
            </p>

            <pre className="bg-gray-900 text-gray-200 p-4 rounded-lg text-sm mb-6 overflow-x-auto">
        /services/graphql/
      </pre>

            <p className="text-gray-300 mb-4">
                ➜ Crée ici tes fichiers de <code>query</code> et <code>mutation</code> :
            </p>

            <ul className="list-disc list-inside text-gray-300 space-y-1 mb-6 ml-4">
                <li><code>project.graphql</code> – pour récupérer le projet et ses tâches.</li>
                <li><code>createTask.graphql</code> – pour créer une tâche.</li>
                <li><code>updateTask.graphql</code> – pour modifier une tâche.</li>
            </ul>

            <p className="text-gray-300 mb-4">
                Une fois les fichiers ajoutés, exécute la commande suivante pour régénérer les hooks Apollo :
            </p>

            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm mb-6 overflow-x-auto">
        yarn codegen
      </pre>

            <p className="text-gray-300 mb-8">
                Cela va générer automatiquement les hooks Apollo (ex : <code>useCreateTaskMutation</code>,
                <code>useUpdateTaskMutation</code>, <code>useProjectQuery</code>) à utiliser dans tes composants.
            </p>

            <div className="bg-gray-950/50 border border-gray-800 rounded-lg p-4 mb-8">
                <p className="text-gray-400 mb-2">📚 Documentation GraphQL :</p>
                <ul className="space-y-1 text-blue-400 text-sm">
                    <li>
                        <Link
                            href="https://www.apollographql.com/docs/react/data/mutations/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 hover:underline"
                        >
                            Apollo React – Mutations
                            <ExternalLink className="h-3 w-3"/>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="https://the-guild.dev/graphql/codegen/docs/getting-started"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 hover:underline"
                        >
                            GraphQL Code Generator
                            <ExternalLink className="h-3 w-3"/>
                        </Link>
                    </li>
                </ul>
            </div>

            <Alert className="bg-white/10 border-gray-700">
                <Lightbulb className="h-5 w-5 text-white"/>
                <AlertTitle className="text-white">Astuce</AlertTitle>
                <AlertDescription className="text-white">
                    Si tu modifies le backend, pense toujours à relancer <code>yarn codegen</code> pour mettre à jour
                    ton schema.
                    N’hésite pas à t’inspirer des composants existants (CreateUserFormDialog, ProjectItem, etc.) pour
                    garder la même logique.
                </AlertDescription>
            </Alert>

            <Separator className="my-8 bg-gray-800"/>

            <h3 className="text-xl font-semibold text-white mb-4">📦 Bonus</h3>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Ajoute un filtre pour afficher uniquement les tâches selon leur statut.</li>
                <li>Ajoute une barre de progression du projet (ex : 3/5 tâches terminées).</li>
                <li>Ajoute une suppression de tâche avec confirmation.</li>
                <li>Rends la page responsive et fluide.</li>
            </ul>
        </div>
    )
}
