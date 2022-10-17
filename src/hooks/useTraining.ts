import { trpc } from '@/utils/trpc';

export function useGetTrainingById(id: string) {
  const { data, status } = trpc.useQuery(['training.getTrainingById', { id }]);

  return {
    training: data?.result,
    status,
  };
}

export function useGet30LatestTrainings() {
  const { data, status } = trpc.useQuery(['training.get30LatestTrainings']);

  return {
    trainings: data?.result,
    status,
  };
}
