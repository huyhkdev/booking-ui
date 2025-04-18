import { useQuery } from '@tanstack/react-query'
import api from '../../api/api'
import { baseURL } from '../../api/constant'
import { useAccessToken } from '../auth/useUserInfo'

interface Review {
  userId: string
  rating: number
  comment: string
  createdAt: string
}

interface HotelReview {
  hotelId: string
  hotelName: string
  totalReviews: number
  averageRating: number
  reviews: Review[]
}

interface ReviewsResponse {
  httpStatusCode: number
  data: {
    totalReviews: number
    hotels: HotelReview[]
  }
}

export const useOwnerReviews = () => {
  const accessToken = useAccessToken()
  const { data, isLoading } = useQuery<ReviewsResponse>({
    queryKey: ['owner-reviews'],
    queryFn: () =>
      api.get(`${baseURL}/review/owner`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }).then(res => res.data)
  })

  return {
    reviewsData: data?.data,
    isLoading
  }
} 