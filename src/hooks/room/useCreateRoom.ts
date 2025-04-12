import { useMutation } from '@tanstack/react-query'
import api from '../../api/api'
import { baseURL } from '../../api/constant'
import { useAccessToken } from '../auth/useUserInfo'

export function useCreateRoom() {
  const accessToken = useAccessToken()
  return useMutation({
    mutationFn: (body: FormData) => {
      return api.post(`${baseURL}/room/owner`, body, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'content-type': 'multipart/form-data'
        }
      })
    }
  })
}
