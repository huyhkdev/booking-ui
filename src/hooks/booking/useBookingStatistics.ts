import { useQuery } from '@tanstack/react-query';
import api from '../../api/api';
import { baseURL } from '../../api/constant';
import { useAccessToken } from '../auth/useUserInfo';

interface Booking {
  _id: string;
  checkInDate: string;
  checkOutDate: string;
  totalPrice: number;
  status: string;
}

interface BookingStatistics {
  monthlyBookings: number[];
  monthlyRevenue: number[];
  labels: string[];
}

export function useBookingStatistics(hotelId: string) {
  const accessToken = useAccessToken();

  return useQuery<BookingStatistics>({
    queryKey: ['booking-statistics', hotelId],
    queryFn: async () => {
      const response = await api.get(`${baseURL}/booking/hotel/${hotelId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const bookings = response.data.data as Booking[];
      
      // Group bookings by month
      const monthlyData = bookings.reduce((acc, booking) => {
        const month = new Date(booking.checkInDate).getMonth();
        acc[month] = acc[month] || { bookings: 0, revenue: 0 };
        acc[month].bookings += 1;
        acc[month].revenue += booking.totalPrice;
        return acc;
      }, {} as Record<number, { bookings: number; revenue: number }>);

      // Create arrays for the last 6 months
      const months = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6'];
      const monthlyBookings = months.map((_, index) => monthlyData[index]?.bookings || 0);
      const monthlyRevenue = months.map((_, index) => monthlyData[index]?.revenue || 0);

      return {
        monthlyBookings,
        monthlyRevenue,
        labels: months,
      };
    },
    enabled: !!hotelId,
  });
} 