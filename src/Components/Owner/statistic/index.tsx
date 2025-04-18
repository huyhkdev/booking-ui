import { Card, Col, Row, Statistic, Table } from 'antd'
import { useOwnerStatistics } from '../../../hooks/owner/useOwnerStatistics'
import { Spin } from 'antd'
import { formatCurrency } from '../../../utils/formatCurrency'

export const StatisticHotels = () => {
  const { statisticsData, isLoading } = useOwnerStatistics()
  
  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-96'>
        <Spin size='large' />
      </div>
    )
  }

  const columns = [
    {
      title: 'Khách sạn',
      dataIndex: 'hotelName',
      key: 'hotelName'
    },
    {
      title: 'Doanh thu',
      dataIndex: 'totalRevenue',
      key: 'totalRevenue',
      render: (value: number) => formatCurrency(value)
    },
    {
      title: 'Số lượng đặt phòng',
      dataIndex: 'bookingCount',
      key: 'bookingCount'
    },
    {
      title: 'Số phòng',
      dataIndex: 'roomCount',
      key: 'roomCount'
    }
  ]

  const dataSource = statisticsData?.revenueByHotel
    ? Object.values(statisticsData.revenueByHotel)
    : []

  return (
    <div className='space-y-6'>
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic
              title='Tổng số khách sạn'
              value={statisticsData?.totalHotels}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title='Tổng số phòng'
              value={statisticsData?.totalRooms}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title='Tổng số đặt phòng'
              value={statisticsData?.totalBookings}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title='Tổng doanh thu'
              value={statisticsData?.totalRevenue}
              formatter={(value) => formatCurrency(value as number)}
            />
          </Card>
        </Col>
      </Row>

      <Card title='Thống kê theo khách sạn'>
        <Table
          dataSource={dataSource}
          columns={columns}
          rowKey='hotelId'
          pagination={false}
        />
      </Card>
    </div>
  )
}
