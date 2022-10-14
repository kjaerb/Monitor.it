import AddUserStep from "@/components/MissingProfileInfo/AddUsersStep";
import FigLicenseStep from "@/components/MissingProfileInfo/FigLicenseStep";
import InformationStep from "@/components/MissingProfileInfo/InformationStep";
import ProfileSummaryStep from "@/components/MissingProfileInfo/ProfileSummaryStep";
import { AthleteInfoProps } from "@/data/trampolineLicenses";
import { Roles } from "@/types/roles";
import { Discipline } from "@/types/discipline";
import create from "zustand";

export const steps = [
  {
    step: 0,
    title: "FIG License",
    component: FigLicenseStep,
  },
  {
    step: 1,
    title: "Information",
    component: InformationStep,
  },
  {
    step: 2,
    title: "Add users",
    component: AddUserStep,
  },
  {
    step: 3,
    title: "Profile summary",
    component: ProfileSummaryStep,
  },
];

interface useStepStoreProps {
  step: number;
  incStep: () => void;
  decStep: () => void;
  role?: Roles;
  setRole: (role: Roles) => void;
  sport?: Discipline | string;
  setSport: (sport: Discipline | string) => void;
  name?: string;
  setName: (name: string) => void;
  sharingUsers: string[];
  setSharingUsers: (users: string[]) => void;
  figLicense?: string;
  setFigLicense: (license: string) => void;
  athlete?: AthleteInfoProps;
  setAthlete: (athlete: AthleteInfoProps) => void;
}

export const useStepStore = create<useStepStoreProps>((set) => ({
  step: 0,
  incStep: () => set((state) => ({ step: state.step + 1 })),
  decStep: () => set((state) => ({ step: state.step - 1 })),
  role: undefined,
  setRole: (role: Roles) => set({ role }),
  sport: undefined,
  setSport: (sport: Discipline | string) => set({ sport }),
  name: undefined,
  setName: (name: string) => set({ name }),
  sharingUsers: [],
  setSharingUsers: (users: string[]) => set({ sharingUsers: users }),
  figLicense: "",
  setFigLicense: (license: string) => set({ figLicense: license }),
  athlete: undefined,
  setAthlete: (athlete: AthleteInfoProps) => set({ athlete }),
}));
