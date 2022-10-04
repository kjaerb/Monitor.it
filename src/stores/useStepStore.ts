import { Roles } from "@/types/roles";
import { Sports } from "@/types/sports";
import create from "zustand";

export const steps = [
  {
    step: 0,
    title: "Information",
  },
  {
    step: 1,
    title: "Add users",
  },
  {
    step: 2,
    title: "Profile summary",
  },
];

interface useStepStoreProps {
  step: number;
  incStep: () => void;
  decStep: () => void;
  role?: Roles;
  setRole: (role: Roles) => void;
  sport?: Sports;
  setSport: (sport: Sports) => void;
  name?: string;
  setName: (name: string) => void;
  sharingUsers: string[];
  setSharingUsers: (users: string[]) => void;
}

export const useStepStore = create<useStepStoreProps>((set) => ({
  step: 0,
  incStep: () => set((state) => ({ step: state.step + 1 })),
  decStep: () => set((state) => ({ step: state.step - 1 })),
  role: undefined,
  setRole: (role: Roles) => set({ role }),
  sport: undefined,
  setSport: (sport: Sports) => set({ sport }),
  name: undefined,
  setName: (name: string) => set({ name }),
  sharingUsers: [],
  setSharingUsers: (users: string[]) => set({ sharingUsers: users }),
}));
