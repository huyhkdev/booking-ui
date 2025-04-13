import { useQuery } from '@tanstack/react-query'
import api from '../../api/api'
import { baseURL } from '../../api/constant'
import { useAccessToken } from '../auth/useUserInfo'
import { Room } from '../room/useSearchRoom'

export function useRoomsByHotelId(hotelId: string) {
  const accessToken = useAccessToken()
  return useQuery<Room[]>({
    queryKey: ['rooms-hotel-owner'],
    queryFn: () =>
      api
        .get(`${baseURL}/room/owner/hotel/${hotelId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
        .then((response) => response.data.data)
  })
}
