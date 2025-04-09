import { useQuery } from '@tanstack/react-query'
import api from '../../api/api'
import { baseURL } from '../../api/constant'
import { useAccessToken } from '../auth/useUserInfo'

export function useInfoRequestOwner() {
  const accessToken = useAccessToken()
  return useQuery({
    queryKey: ['info-request'],
    queryFn: () =>
      api.get(`${baseURL}/owner/info-request`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
  })
}
