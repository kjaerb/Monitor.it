import { trpc } from '@/utils/trpc';

export function useCreateProfile() {
  const utils = trpc.useContext();

  const { mutate, isLoading, status } = trpc.useMutation(
    'profile.createProfile',
    {
      onSuccess() {
        utils.invalidateQueries(['user.getUser']);
      },
    }
  );

  return {
    createProfile: mutate,
    isLoading,
    status,
  };
}
