import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type CreateProjectInput = {
  /** Nom du projet */
  name: Scalars['String']['input'];
  /** Identifiant de l'utilisateur qui créé le projet */
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type CreateTaskInput = {
  /** Description */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Identifiant du projet lié à la tache */
  projectId: Scalars['String']['input'];
  /** Identifiant du statut de la tache */
  statusId: Scalars['String']['input'];
  /** Titre */
  title: Scalars['String']['input'];
};

export type CreateUserInput = {
  /** Email de l'utilisateur */
  email: Scalars['String']['input'];
  /** Prénom de l'utilisateur */
  firstname: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Permet de créer un nouveau projet */
  createProject: Project;
  /** Permet de créer une nouvelle tache */
  createTask: Task;
  /** Permet de créer un nouvel utilisateur */
  createUser: User;
  /** Permet de mettre à jour un ou plusieurs champs d'une tache */
  updateTask: Task;
};


export type MutationCreateProjectArgs = {
  dto: CreateProjectInput;
};


export type MutationCreateTaskArgs = {
  dto: CreateTaskInput;
};


export type MutationCreateUserArgs = {
  dto: CreateUserInput;
};


export type MutationUpdateTaskArgs = {
  dto: UpdateTaskInput;
};

export type Project = {
  __typename?: 'Project';
  /** Date de création (UTC, immuable) */
  createdAt: Scalars['DateTime']['output'];
  /** Date de suppression (UTC) */
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  tasks?: Maybe<Array<Task>>;
  /** Date de dernière mise à jour (UTC) */
  updatedAt: Scalars['DateTime']['output'];
  user: User;
};

export type ProjectByIdInput = {
  /** Identifiant du projet */
  id: Scalars['String']['input'];
};

export type ProjectFiltersInput = {
  /** Identifiant de l'utilisateur */
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  /** Retourne la liste des projets, filtrables par utilisateur */
  allProjects: Array<Project>;
  /** Retourne la liste des status */
  allStatus: Array<Status>;
  /** Retourne la liste des taches, filtrables par projet */
  allTasks: Array<Task>;
  /** Retourne la liste des utilisateurs */
  allUsers: Array<User>;
  /** Retourne le projet avec l'id correspondant */
  findProjectById: Project;
};


export type QueryAllProjectsArgs = {
  dto: ProjectFiltersInput;
};


export type QueryAllTasksArgs = {
  dto: TaskFiltersInput;
};


export type QueryFindProjectByIdArgs = {
  dto: ProjectByIdInput;
};

export type Status = {
  __typename?: 'Status';
  /** Date de création (UTC, immuable) */
  createdAt: Scalars['DateTime']['output'];
  /** Date de suppression (UTC) */
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  tasks?: Maybe<Array<Task>>;
  /** Date de dernière mise à jour (UTC) */
  updatedAt: Scalars['DateTime']['output'];
};

export type Task = {
  __typename?: 'Task';
  archivedAt?: Maybe<Scalars['DateTime']['output']>;
  /** Date de création (UTC, immuable) */
  createdAt: Scalars['DateTime']['output'];
  /** Date de suppression (UTC) */
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isArchived: Scalars['Boolean']['output'];
  project: Project;
  status: Status;
  title: Scalars['String']['output'];
  /** Date de dernière mise à jour (UTC) */
  updatedAt: Scalars['DateTime']['output'];
};

export type TaskFiltersInput = {
  /** Identifiant du projet */
  projectId?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateTaskInput = {
  /** archivedAt */
  archivedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** Description */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Identifiant de la tâche à mettre à jour */
  id: Scalars['String']['input'];
  /** isArchived */
  isArchived?: InputMaybe<Scalars['Boolean']['input']>;
  /** Identifiant du projet lié à la tache */
  projectId?: InputMaybe<Scalars['String']['input']>;
  /** Identifiant du statut de la tache */
  statusId?: InputMaybe<Scalars['String']['input']>;
  /** Titre */
  title?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  /** Date de création (UTC, immuable) */
  createdAt: Scalars['DateTime']['output'];
  /** Date de suppression (UTC) */
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  firstname: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  projects?: Maybe<Array<Project>>;
  /** Date de dernière mise à jour (UTC) */
  updatedAt: Scalars['DateTime']['output'];
};

export type CreateProjectMutationVariables = Exact<{
  dto: CreateProjectInput;
}>;


export type CreateProjectMutation = { __typename?: 'Mutation', createProject: { __typename?: 'Project', id: string } };

export type CreateTaskMutationVariables = Exact<{
  dto: CreateTaskInput;
}>;


export type CreateTaskMutation = { __typename?: 'Mutation', createTask: { __typename?: 'Task', id: string } };

export type UpdateTaskMutationVariables = Exact<{
  dto: UpdateTaskInput;
}>;


export type UpdateTaskMutation = { __typename?: 'Mutation', updateTask: { __typename?: 'Task', id: string, title: string, description?: string | null, isArchived: boolean, archivedAt?: any | null, project: { __typename?: 'Project', id: string, name: string }, status: { __typename?: 'Status', id: string, name: string } } };

export type CreateUserMutationVariables = Exact<{
  dto: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: string, firstname: string, email: string, createdAt: any, updatedAt: any } };

export type AllProjectsQueryVariables = Exact<{
  dto: ProjectFiltersInput;
}>;


export type AllProjectsQuery = { __typename?: 'Query', allProjects: Array<{ __typename?: 'Project', id: string, name: string, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: string, firstname: string, email: string } }> };

export type FindProjectByIdQueryVariables = Exact<{
  dto: ProjectByIdInput;
}>;


export type FindProjectByIdQuery = { __typename?: 'Query', findProjectById: { __typename?: 'Project', id: string, name: string, createdAt: any, user: { __typename?: 'User', id: string, email: string } } };

export type AllStatusQueryVariables = Exact<{ [key: string]: never; }>;


export type AllStatusQuery = { __typename?: 'Query', allStatus: Array<{ __typename?: 'Status', id: string, name: string }> };

export type AllTasksQueryVariables = Exact<{
  dto: TaskFiltersInput;
}>;


export type AllTasksQuery = { __typename?: 'Query', allTasks: Array<{ __typename?: 'Task', id: string, title: string, description?: string | null, isArchived: boolean, archivedAt?: any | null, createdAt: any, updatedAt: any, status: { __typename?: 'Status', id: string, name: string }, project: { __typename?: 'Project', id: string, name: string } }> };

export type AllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type AllUsersQuery = { __typename?: 'Query', allUsers: Array<{ __typename?: 'User', id: string, firstname: string, email: string, createdAt: any, updatedAt: any }> };


export const CreateProjectDocument = gql`
    mutation createProject($dto: CreateProjectInput!) {
  createProject(dto: $dto) {
    id
  }
}
    `;
export type CreateProjectMutationFn = Apollo.MutationFunction<CreateProjectMutation, CreateProjectMutationVariables>;

/**
 * __useCreateProjectMutation__
 *
 * To run a mutation, you first call `useCreateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProjectMutation, { data, loading, error }] = useCreateProjectMutation({
 *   variables: {
 *      dto: // value for 'dto'
 *   },
 * });
 */
export function useCreateProjectMutation(baseOptions?: Apollo.MutationHookOptions<CreateProjectMutation, CreateProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProjectMutation, CreateProjectMutationVariables>(CreateProjectDocument, options);
      }
export type CreateProjectMutationHookResult = ReturnType<typeof useCreateProjectMutation>;
export type CreateProjectMutationResult = Apollo.MutationResult<CreateProjectMutation>;
export type CreateProjectMutationOptions = Apollo.BaseMutationOptions<CreateProjectMutation, CreateProjectMutationVariables>;
export const CreateTaskDocument = gql`
    mutation createTask($dto: CreateTaskInput!) {
  createTask(dto: $dto) {
    id
  }
}
    `;
export type CreateTaskMutationFn = Apollo.MutationFunction<CreateTaskMutation, CreateTaskMutationVariables>;

/**
 * __useCreateTaskMutation__
 *
 * To run a mutation, you first call `useCreateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTaskMutation, { data, loading, error }] = useCreateTaskMutation({
 *   variables: {
 *      dto: // value for 'dto'
 *   },
 * });
 */
export function useCreateTaskMutation(baseOptions?: Apollo.MutationHookOptions<CreateTaskMutation, CreateTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTaskMutation, CreateTaskMutationVariables>(CreateTaskDocument, options);
      }
export type CreateTaskMutationHookResult = ReturnType<typeof useCreateTaskMutation>;
export type CreateTaskMutationResult = Apollo.MutationResult<CreateTaskMutation>;
export type CreateTaskMutationOptions = Apollo.BaseMutationOptions<CreateTaskMutation, CreateTaskMutationVariables>;
export const UpdateTaskDocument = gql`
    mutation updateTask($dto: UpdateTaskInput!) {
  updateTask(dto: $dto) {
    id
    title
    description
    project {
      id
      name
    }
    status {
      id
      name
    }
    isArchived
    archivedAt
  }
}
    `;
export type UpdateTaskMutationFn = Apollo.MutationFunction<UpdateTaskMutation, UpdateTaskMutationVariables>;

/**
 * __useUpdateTaskMutation__
 *
 * To run a mutation, you first call `useUpdateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTaskMutation, { data, loading, error }] = useUpdateTaskMutation({
 *   variables: {
 *      dto: // value for 'dto'
 *   },
 * });
 */
export function useUpdateTaskMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTaskMutation, UpdateTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTaskMutation, UpdateTaskMutationVariables>(UpdateTaskDocument, options);
      }
export type UpdateTaskMutationHookResult = ReturnType<typeof useUpdateTaskMutation>;
export type UpdateTaskMutationResult = Apollo.MutationResult<UpdateTaskMutation>;
export type UpdateTaskMutationOptions = Apollo.BaseMutationOptions<UpdateTaskMutation, UpdateTaskMutationVariables>;
export const CreateUserDocument = gql`
    mutation createUser($dto: CreateUserInput!) {
  createUser(dto: $dto) {
    id
    firstname
    email
    createdAt
    updatedAt
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      dto: // value for 'dto'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const AllProjectsDocument = gql`
    query allProjects($dto: ProjectFiltersInput!) {
  allProjects(dto: $dto) {
    id
    name
    user {
      id
      firstname
      email
    }
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useAllProjectsQuery__
 *
 * To run a query within a React component, call `useAllProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllProjectsQuery({
 *   variables: {
 *      dto: // value for 'dto'
 *   },
 * });
 */
export function useAllProjectsQuery(baseOptions: Apollo.QueryHookOptions<AllProjectsQuery, AllProjectsQueryVariables> & ({ variables: AllProjectsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllProjectsQuery, AllProjectsQueryVariables>(AllProjectsDocument, options);
      }
export function useAllProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllProjectsQuery, AllProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllProjectsQuery, AllProjectsQueryVariables>(AllProjectsDocument, options);
        }
export function useAllProjectsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<AllProjectsQuery, AllProjectsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AllProjectsQuery, AllProjectsQueryVariables>(AllProjectsDocument, options);
        }
export type AllProjectsQueryHookResult = ReturnType<typeof useAllProjectsQuery>;
export type AllProjectsLazyQueryHookResult = ReturnType<typeof useAllProjectsLazyQuery>;
export type AllProjectsSuspenseQueryHookResult = ReturnType<typeof useAllProjectsSuspenseQuery>;
export type AllProjectsQueryResult = Apollo.QueryResult<AllProjectsQuery, AllProjectsQueryVariables>;
export function refetchAllProjectsQuery(variables: AllProjectsQueryVariables) {
      return { query: AllProjectsDocument, variables: variables }
    }
export const FindProjectByIdDocument = gql`
    query findProjectById($dto: ProjectByIdInput!) {
  findProjectById(dto: $dto) {
    id
    name
    createdAt
    user {
      id
      email
    }
  }
}
    `;

/**
 * __useFindProjectByIdQuery__
 *
 * To run a query within a React component, call `useFindProjectByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindProjectByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindProjectByIdQuery({
 *   variables: {
 *      dto: // value for 'dto'
 *   },
 * });
 */
export function useFindProjectByIdQuery(baseOptions: Apollo.QueryHookOptions<FindProjectByIdQuery, FindProjectByIdQueryVariables> & ({ variables: FindProjectByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindProjectByIdQuery, FindProjectByIdQueryVariables>(FindProjectByIdDocument, options);
      }
export function useFindProjectByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindProjectByIdQuery, FindProjectByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindProjectByIdQuery, FindProjectByIdQueryVariables>(FindProjectByIdDocument, options);
        }
export function useFindProjectByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindProjectByIdQuery, FindProjectByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindProjectByIdQuery, FindProjectByIdQueryVariables>(FindProjectByIdDocument, options);
        }
export type FindProjectByIdQueryHookResult = ReturnType<typeof useFindProjectByIdQuery>;
export type FindProjectByIdLazyQueryHookResult = ReturnType<typeof useFindProjectByIdLazyQuery>;
export type FindProjectByIdSuspenseQueryHookResult = ReturnType<typeof useFindProjectByIdSuspenseQuery>;
export type FindProjectByIdQueryResult = Apollo.QueryResult<FindProjectByIdQuery, FindProjectByIdQueryVariables>;
export function refetchFindProjectByIdQuery(variables: FindProjectByIdQueryVariables) {
      return { query: FindProjectByIdDocument, variables: variables }
    }
export const AllStatusDocument = gql`
    query allStatus {
  allStatus {
    id
    name
  }
}
    `;

/**
 * __useAllStatusQuery__
 *
 * To run a query within a React component, call `useAllStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllStatusQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllStatusQuery(baseOptions?: Apollo.QueryHookOptions<AllStatusQuery, AllStatusQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllStatusQuery, AllStatusQueryVariables>(AllStatusDocument, options);
      }
export function useAllStatusLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllStatusQuery, AllStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllStatusQuery, AllStatusQueryVariables>(AllStatusDocument, options);
        }
export function useAllStatusSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<AllStatusQuery, AllStatusQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AllStatusQuery, AllStatusQueryVariables>(AllStatusDocument, options);
        }
export type AllStatusQueryHookResult = ReturnType<typeof useAllStatusQuery>;
export type AllStatusLazyQueryHookResult = ReturnType<typeof useAllStatusLazyQuery>;
export type AllStatusSuspenseQueryHookResult = ReturnType<typeof useAllStatusSuspenseQuery>;
export type AllStatusQueryResult = Apollo.QueryResult<AllStatusQuery, AllStatusQueryVariables>;
export function refetchAllStatusQuery(variables?: AllStatusQueryVariables) {
      return { query: AllStatusDocument, variables: variables }
    }
export const AllTasksDocument = gql`
    query allTasks($dto: TaskFiltersInput!) {
  allTasks(dto: $dto) {
    id
    title
    description
    status {
      id
      name
    }
    isArchived
    archivedAt
    project {
      id
      name
    }
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useAllTasksQuery__
 *
 * To run a query within a React component, call `useAllTasksQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllTasksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllTasksQuery({
 *   variables: {
 *      dto: // value for 'dto'
 *   },
 * });
 */
export function useAllTasksQuery(baseOptions: Apollo.QueryHookOptions<AllTasksQuery, AllTasksQueryVariables> & ({ variables: AllTasksQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllTasksQuery, AllTasksQueryVariables>(AllTasksDocument, options);
      }
export function useAllTasksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllTasksQuery, AllTasksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllTasksQuery, AllTasksQueryVariables>(AllTasksDocument, options);
        }
export function useAllTasksSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<AllTasksQuery, AllTasksQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AllTasksQuery, AllTasksQueryVariables>(AllTasksDocument, options);
        }
export type AllTasksQueryHookResult = ReturnType<typeof useAllTasksQuery>;
export type AllTasksLazyQueryHookResult = ReturnType<typeof useAllTasksLazyQuery>;
export type AllTasksSuspenseQueryHookResult = ReturnType<typeof useAllTasksSuspenseQuery>;
export type AllTasksQueryResult = Apollo.QueryResult<AllTasksQuery, AllTasksQueryVariables>;
export function refetchAllTasksQuery(variables: AllTasksQueryVariables) {
      return { query: AllTasksDocument, variables: variables }
    }
export const AllUsersDocument = gql`
    query allUsers {
  allUsers {
    id
    firstname
    email
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useAllUsersQuery__
 *
 * To run a query within a React component, call `useAllUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllUsersQuery(baseOptions?: Apollo.QueryHookOptions<AllUsersQuery, AllUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllUsersQuery, AllUsersQueryVariables>(AllUsersDocument, options);
      }
export function useAllUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllUsersQuery, AllUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllUsersQuery, AllUsersQueryVariables>(AllUsersDocument, options);
        }
export function useAllUsersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<AllUsersQuery, AllUsersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AllUsersQuery, AllUsersQueryVariables>(AllUsersDocument, options);
        }
export type AllUsersQueryHookResult = ReturnType<typeof useAllUsersQuery>;
export type AllUsersLazyQueryHookResult = ReturnType<typeof useAllUsersLazyQuery>;
export type AllUsersSuspenseQueryHookResult = ReturnType<typeof useAllUsersSuspenseQuery>;
export type AllUsersQueryResult = Apollo.QueryResult<AllUsersQuery, AllUsersQueryVariables>;
export function refetchAllUsersQuery(variables?: AllUsersQueryVariables) {
      return { query: AllUsersDocument, variables: variables }
    }