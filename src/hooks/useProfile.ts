import { trpc } from "@/utils/trpc";

export function getProfile() {
  const { data, status } = trpc.useQuery(["profile.getProfile"]);

  return {
    profile: data?.result,
    status,
  };
}

export function useCreateProfile() {
  const { mutate: createProfile } = trpc.useMutation("profile.createProfile");

  return {
    createProfile,
  };
}
