# 🚀 Bienvenue sur le test Kelkun

Le but du test est de compléter le module de **gestion des tâches associées à un projet**,  
aussi bien côté **backend (NestJS)** que **frontend (Next.js)**.  
Tu devras respecter la structure, la charte et les librairies déjà utilisées dans le projet.

---

## 🧩 Modules à compléter

### 💻 Frontend

Utilise **React Hook Form**, **Zod** et **ShadCN UI** pour gérer la création et l’affichage des tâches.  
Respecte le design sombre et les conventions du dashboard.

### 🗄️ Backend

Crée le module complet **Task** :

- Entity
- DTO
- Service
- Resolver
- Queries et mutations

Génère et exécute la migration correspondante.

### ⏰ Job planifié

Mets en place un **cron job (NestJS Schedule)** qui s’exécute **toutes les minutes**  
et **archive automatiquement** les tâches de plus de 15 minutes.

---

## 🧠 Étapes principales

1. Créer le module `Task` côté backend (NestJS).
2. Générer la migration et la synchroniser avec la base de données.
3. Compléter la page `/projects/[id]` côté frontend.
4. Afficher et manipuler les tâches du projet sélectionné.
5. Configurer le job d’archivage automatique.

---

## 💡 Conseils

- Sois attentif à la **cohérence entre backend et frontend**.
- Le **design et la clarté du code** comptent autant que la fonctionnalité.
- N’hésite pas à consulter la documentation officielle des librairies utilisées.

---

Bonne chance, et n’oublie pas :
> Un code clair et bien organisé vaut autant que la fonctionnalité ⚡️
