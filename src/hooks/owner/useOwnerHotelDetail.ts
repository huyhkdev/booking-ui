import { useQuery } from '@tanstack/react-query'
import api from '../../api/api'
import { baseURL } from '../../api/constant'
import { useAccessToken } from '../auth/useUserInfo'
import { Hotel } from './useOwnerHotels'  // Import Hotel interface from the previous code

export function useOwnerHotelDetail(hotelId: string) {
  const accessToken = useAccessToken()

  return useQuery<Hotel>({
    queryKey: ['hotel-detail', hotelId],
    queryFn: () =>
      api
        .get(`${baseURL}/hotels/owner/${hotelId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => response.data.data),
    enabled: !!hotelId,
  })
}
