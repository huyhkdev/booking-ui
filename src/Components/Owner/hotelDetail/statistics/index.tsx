import { Card, Typography, Spin } from 'antd';
import { motion } from 'framer-motion';
import BookingChart from '../../../BookingChart';
import { useBookingStatistics } from '../../../../hooks/booking/useBookingStatistics';

const { Title } = Typography;

interface StatisticsProps {
  hotelId: string;
}

export const Statistics = ({ hotelId }: StatisticsProps) => {
  const { data: statistics, isLoading } = useBookingStatistics(hotelId);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  const bookingData = {
    labels: statistics?.labels || [],
    datasets: [
      {
        label: 'Số lượt đặt phòng',
        data: statistics?.monthlyBookings || [],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Doanh thu (VND)',
        data: statistics?.monthlyRevenue || [],
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <Card title={<Title level={4}>Thống kê đặt phòng</Title>} bordered={false} className="shadow-md rounded-2xl">
        <BookingChart data={bookingData} />
      </Card>
    </motion.div>
  );
}; 