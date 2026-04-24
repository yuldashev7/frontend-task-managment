import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { getUsersT } from '../types/types';

export const useGetUsers = () => {
  return useQuery<getUsersT[]>({
    queryKey: ['admin-users'],
    queryFn: async () => {
      const { data } = await axios.get('/api/admin/team/get-users');
      return data;
    },
    retry: 2,
  });
};
