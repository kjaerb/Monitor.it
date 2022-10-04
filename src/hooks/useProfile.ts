import { trpc } from "@/utils/trpc";
import { useSession } from "next-auth/react";

export function useGetProfile() {
  const { data, status } = trpc.useQuery(["profile.getProfile"]);

  return {
    profile: data?.result,
    status,
  };
}

export function useProfileByEmail(email: string) {
  const { data, status } = trpc.useQuery([
    "profile.getProfileByEmail",
    { email },
  ]);

  return {
    profile: data?.result,
    status,
  };
}

export function useProfileNames() {
  const { data, status } = trpc.useQuery(["profile.getProfileNames"]);

  return {
    profileNames: data?.result,
    status,
  };
}

export function useCreateProfile() {
  const utils = trpc.useContext();

  const { mutate, isLoading, isSuccess, isError, error } = trpc.useMutation(
    ["profile.createProfile"],
    {
      onSuccess: () => {
        utils.invalidateQueries(["profile.getProfile"]);
      },
    }
  );

  return {
    createProfile: mutate,
  };
}
