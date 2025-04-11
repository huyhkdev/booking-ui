import { useMutation } from '@tanstack/react-query'
import api from '../../api/api'
import { baseURL } from '../../api/constant'

export function useDeleteHotel(token: string, hotelId: string) {
  return useMutation({
    mutationFn: () => {
      return api.delete(`${baseURL}/hotels/${hotelId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    }
  })
}
