import AddUserStep from '@/components/MissingProfileInfo/AddUsersStep';
import FigLicenseStep from '@/components/MissingProfileInfo/FigLicenseStep';
import InformationStep from '@/components/MissingProfileInfo/InformationStep';
import ProfileSummaryStep from '@/components/MissingProfileInfo/ProfileSummaryStep';
import { Role } from '@/types/roles';
import { Sport } from '@/types/sport';
import { Figathlete } from '@prisma/client';

import create from 'zustand';

export const steps = [
  {
    step: 0,
    title: 'FIG License',
    component: FigLicenseStep,
  },
  {
    step: 1,
    title: 'Information',
    component: InformationStep,
  },
  {
    step: 2,
    title: 'Add users',
    component: AddUserStep,
  },
  {
    step: 3,
    title: 'Profile summary',
    component: ProfileSummaryStep,
  },
];

interface useStepStoreProps {
  step: number;
  incStep: () => void;
  decStep: () => void;
  role?: Role;
  setRole: (role: Role) => void;
  sport?: Sport | string;
  setSport: (sport: Sport | string) => void;
  name?: string;
  setName: (name: string) => void;
  sharingUsers: string[];
  setSharingUsers: (users: string[]) => void;
  figLicense: string;
  setFigLicense: (license: string) => void;
  athlete?: Figathlete;
  setAthlete: (athlete?: Figathlete) => void;
}

export const useStepStore = create<useStepStoreProps>((set) => ({
  step: 0,
  incStep: () => set((state) => ({ step: state.step + 1 })),
  decStep: () => set((state) => ({ step: state.step - 1 })),
  role: Role.UNDEFINED,
  setRole: (role) => set({ role }),
  sport: Sport.UNDEFINED,
  setSport: (sport) => set({ sport }),
  name: undefined,
  setName: (name) => set({ name }),
  sharingUsers: [],
  setSharingUsers: (users) => set({ sharingUsers: users }),
  figLicense: '',
  setFigLicense: (license) => set({ figLicense: license }),
  athlete: undefined,
  setAthlete: (athlete) => set({ athlete }),
}));
