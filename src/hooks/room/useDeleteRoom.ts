import { useMutation } from '@tanstack/react-query'
import api from '../../api/api'
import { baseURL } from '../../api/constant'
import { useAccessToken } from '../auth/useUserInfo'

export function useDeleteRoom() {
  const token = useAccessToken()
  return useMutation({
    mutationFn: (roomId: string) => {
      return api.delete(`${baseURL}/room/owner/${roomId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    }
  })
}
