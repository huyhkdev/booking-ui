import { useQuery } from '@tanstack/react-query'
import api from '../../api/api'
import { ROOM } from '../../service/constants'
import { SearchRoomRequest } from './types'
interface Hotel {
  _id: string;
  name: string
  star: number
  address: string
  amenities: string[],
  images: string[]
  rating:number,
}
export interface Room {
  _id: string;
  name: string;
  hotel: Hotel
  roomNumber: string
  type: string,

  pricePerNight: number
  capacity: number
  amenities: string[]
  isAvailable: boolean
  description?: string
  images: string[]
}
export const useSearchRoom = (params: SearchRoomRequest) => {
  return useQuery<{ data: { rooms: Room[], total: number } }>({
    queryKey: [ROOM],
    queryFn: () => api.get('room/findAll', { params }),
    enabled: !!params
  })
}
