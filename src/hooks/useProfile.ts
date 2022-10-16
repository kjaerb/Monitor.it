import { trpc } from "@/utils/trpc";

export function useCreateProfile() {
  const utils = trpc.useContext();

  const { mutate } = trpc.useMutation("profile.createProfile", {
    onSuccess() {
      utils.invalidateQueries(["user.getUser"]);
    },
  });

  return {
    createProfile: mutate,
  };
}
