import { useMutation } from '@tanstack/react-query'
import api from '../../api/api'
import { baseURL } from '../../api/constant'
import { useAccessToken } from '../auth/useUserInfo'
export interface IHotel {
  name: string
  address: string
  city: string
  country: string
  description: string
  longDescription: string
  type: string
  amenities: string[]
  phoneNumber: string
  email: string
  website?: string
  images: string[]
}

export function useHotelRegister() {
  const accessToken = useAccessToken()
  return useMutation({
    mutationFn: (body: FormData) => {
      return api.post(`${baseURL}/hotels`, body, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'content-type': 'multipart/form-data'
        }
      })
    }
  })
}
