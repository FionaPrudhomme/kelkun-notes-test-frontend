import {Project } from '@/services/graphql/generated/graphql'
import { create } from 'zustand';

type ProjectState = {
  selectedProject: Project | null;
  setSelectedProject: (project: Project) => void;
  clearProject: () => void;
};

export const useProjectStore = create<ProjectState>((set) => ({
  selectedProject: null,
  setSelectedProject: (project) => set({ selectedProject: project }),
  clearProject: () => set({ selectedProject: null }),
}));