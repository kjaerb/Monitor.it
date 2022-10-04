import { trpc } from "@/utils/trpc";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

export function useUser() {
  const { data: session } = useSession();
  const { data, status } = trpc.useQuery(["user.getUser"]);

  const hasProfile = useMemo(() => {
    return data?.user?.profile !== null;
  }, [data]);

  return {
    user: data?.user,
    status,
    session,
    hasProfile,
  };
}

export function useUpdateProfile() {
  const { mutate, isLoading, isSuccess } = trpc.useMutation(
    "user.updateUserProfile"
  );

  return { updateProfile: mutate, isLoading, isSuccess };
}
