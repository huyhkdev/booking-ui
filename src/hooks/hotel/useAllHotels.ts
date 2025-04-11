import { useQuery } from '@tanstack/react-query'
import api from '../../api/api'
import { baseURL } from '../../api/constant'
import { useAccessToken } from '../auth/useUserInfo'
import { Hotel } from '../owner'

export function useAllHotels() {
  const accessToken = useAccessToken()
  return useQuery<Hotel[]>({
    queryKey: ['hotels'],
    queryFn: () =>
      api
        .get(`${baseURL}/hotels/all`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
        .then((response) => response.data.data)
  })
}
