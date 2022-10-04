import { Roles } from "@/types/roles";
import create from "zustand";

export const steps = [
  {
    step: 0,
    title: "Name and Role",
  },
  {
    step: 1,
    title: "Contact Information",
  },
  {
    step: 2,
    title: "Address",
  },
];

interface useStepStoreProps {
  step: number;
  incStep: () => void;
  decStep: () => void;
  role: Roles;
  setRole: (role: Roles) => void;
  name: string;
  setName: (name: string) => void;
}

export const useStepStore = create<useStepStoreProps>((set) => ({
  step: 0,
  incStep: () => set((state) => ({ step: state.step + 1 })),
  decStep: () => set((state) => ({ step: state.step - 1 })),
  role: Roles.UNDEFINED,
  setRole: (role: Roles) => set({ role }),
  name: "",
  setName: (name: string) => set({ name }),
}));
