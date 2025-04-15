import { Card, Col, Row, Table, Rate, Spin, Typography } from 'antd'
import { useOwnerReviews } from '../../hooks/owner/useOwnerReviews'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'

const { Title, Text } = Typography

const ReviewManagement = () => {
  const { reviewsData, isLoading } = useOwnerReviews()

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
      key: 'hotelName',
      width: '30%'
    },
    {
      title: 'Số đánh giá',
      dataIndex: 'totalReviews',
      key: 'totalReviews',
      width: '15%'
    },
    {
      title: 'Điểm trung bình',
      dataIndex: 'averageRating',
      key: 'averageRating',
      width: '20%',
      render: (rating: number) => (
        <div className='flex items-center gap-2'>
          <Rate disabled defaultValue={rating} />
          <span className='text-gray-600'>{rating.toFixed(1)}</span>
        </div>
      )
    },
    {
      title: 'Đánh giá gần nhất',
      key: 'latestReview',
      width: '35%',
      render: (record: any) => {
        const latestReview = record.reviews[0]
        if (!latestReview) return '-'
        return (
          <div className='space-y-1'>
            <div className='flex items-center gap-2'>
              <Rate disabled defaultValue={latestReview.rating} />
              <Text type='secondary'>
                {format(new Date(latestReview.createdAt), 'dd/MM/yyyy HH:mm', {
                  locale: vi
                })}
              </Text>
            </div>
            <Text>{latestReview.comment}</Text>
          </div>
        )
      }
    }
  ]

  return (
    <div className='space-y-6'>
      <Row gutter={16}>
        <Col span={24}>
          <Card>
            <Title level={4}>Tổng số đánh giá: {reviewsData?.totalReviews}</Title>
          </Card>
        </Col>
      </Row>

      <Card title='Danh sách đánh giá theo khách sạn'>
        <Table
          dataSource={reviewsData?.hotels}
          columns={columns}
          rowKey='hotelId'
          pagination={false}
        />
      </Card>
    </div>
  )
}

export default ReviewManagement 