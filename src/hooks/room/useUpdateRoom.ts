import { useMutation } from '@tanstack/react-query'
import api from '../../api/api'
import { baseURL } from '../../api/constant'
import { useAccessToken } from '../auth/useUserInfo'

export function useUpdateRoom(roomId: string) {
  const token = useAccessToken()
  return useMutation({
    mutationFn: (body: any) => {
      const isFormData = body instanceof FormData

      return api.put(`${baseURL}/room/owner/${roomId}`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
          ...(isFormData ? { 'Content-Type': 'multipart/form-data' } : { 'Content-Type': 'application/json' })
        }
      })
    }
  })
}
