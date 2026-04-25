import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export const useEditStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      isActive,
    }: {
      id: string | number;
      isActive: boolean;
    }) => {
      const { data } = await axios.patch(`/api/admin/team/edit-status`, {
        id,
        is_active: isActive,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
    },
  });
};
