import { useQuery } from '@tanstack/react-query'
import api from '../../api/api'
import { baseURL } from '../../api/constant'
import { useAccessToken } from '../auth/useUserInfo'

interface RevenueByHotel {
  hotelId: string
  hotelName: string
  totalRevenue: number
  bookingCount: number
}

interface RevenueResponse {
  httpStatusCode: number
  data: {
    totalRevenue: number
    revenueByHotel: RevenueByHotel[]
  }
}

interface HotelStatistics {
  hotelId: string
  hotelName: string
  totalRevenue: number
  bookingCount: number
  roomCount: number
}

interface StatisticsResponse {
  httpStatusCode: number
  data: {
    totalHotels: number
    totalRooms: number
    totalBookings: number
    totalRevenue: number
    averageBookingValue: number
    revenueByHotel: Record<string, HotelStatistics>
  }
}

export const useOwnerStatistics = () => {
  const accessToken = useAccessToken()
  const { data: revenueData, isLoading: isRevenueLoading } = useQuery<RevenueResponse>({
    queryKey: ['owner-revenue'],
    queryFn: () =>
      api.get(`${baseURL}/booking/revenue`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }).then(res => res.data)
  })

  const { data: statisticsData, isLoading: isStatisticsLoading } = useQuery<StatisticsResponse>({
    queryKey: ['owner-statistics'],
    queryFn: () =>
      api.get(`${baseURL}/booking/statistics`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }).then(res => res.data)
  })

  return {
    revenueData: revenueData?.data,
    statisticsData: statisticsData?.data,
    isLoading: isRevenueLoading || isStatisticsLoading
  }
} 