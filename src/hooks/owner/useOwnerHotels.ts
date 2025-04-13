import { useQuery } from '@tanstack/react-query'
import api from '../../api/api'
import { baseURL } from '../../api/constant'
import { useAccessToken } from '../auth/useUserInfo'
import { Room } from '../room/useSearchRoom'
export interface Review {
  _id: string
  user: string
  hotel: Hotel
  rating: number
  comment: string
  imgUrl?: string
  createdAt: Date
  updatedAt: Date
}
export interface Hotel {
  _id: string
  user: string
  name: string
  address: string
  city: string
  country: string
  rating: number
  star: number
  description: string
  longDescription: string
  rooms: Room[]
  type: string
  amenities: string[]
  phoneNumber: string
  email: string
  website?: string
  images: string[]
  reviews: Review[]
  latitude: string
  longitude: string
  createdAt: Date
  updatedAt: Date
}

export function useOwnerHotels() {
  const accessToken = useAccessToken()
  return useQuery<Hotel[]>({
    queryKey: ['hotels-owner'],
    queryFn: () =>
      api
        .get(`${baseURL}/hotels`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
        .then((response) => response.data.data)
  })
}
