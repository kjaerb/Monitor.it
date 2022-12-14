import { useSession } from 'next-auth/react';
import { useMemo } from 'react';

import { trpc } from '@/utils/trpc';

export function useUser() {
  const { data: session } = useSession();
  const { data, status } = trpc.useQuery(['user.getUser']);

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

export function useUpdateUserImage() {
  const utils = trpc.useContext();

  const { mutate, isLoading, isSuccess, status } = trpc.useMutation(
    'user.updateUserImage',
    {
      onSuccess() {
        utils.invalidateQueries(['user.getUser']);
      },
    }
  );

  return {
    updateUserImage: mutate,
    isLoading,
    isSuccess,
    status,
  };
}
