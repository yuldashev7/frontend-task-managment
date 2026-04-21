import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { adminProfileT } from '../types/types';

export const useGetProfile = () => {
  return useQuery<adminProfileT>({
    queryKey: ['admin-profile'],
    queryFn: async () => {
      const { data } = await axios.get('/api/settings');
      return data;
    },
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
