import { Button, Space, Spin, Table, Tag, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import type { ColumnsType } from 'antd/es/table'
import { Hotel } from '../../../hooks/owner'
import useProvince from '../../../hooks/province/useProvince'
import { getLocationByCodeName, mapProvinceCodename } from '../../../utils/getLocationByCodeName'

const { Title } = Typography

interface HotelTableProps {
  hotels: Hotel[]
}

export const ListHotelTable = ({ hotels }: HotelTableProps) => {
  const navigate = useNavigate()
  const { data: provinces, isLoading } = useProvince()

  if (isLoading || !provinces) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Spin size='large' />
      </div>
    )
  }
  const provinceMap = mapProvinceCodename(provinces?.data || [])

  const columns: ColumnsType<Hotel> = [
    {
      title: 'Hình ảnh',
      dataIndex: 'images',
      key: 'images',
      render: (images: string[]) => <img src={images?.[0]} alt='Hotel' className='h-16 w-28 object-cover rounded-md' />
    },
    {
      title: 'Tên khách sạn',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record) => (
        <span
          className='font-medium text-blue-600 cursor-pointer hover:underline'
          onClick={() => navigate(`/owner/hotels/${record._id}`)}
        >
          {text}
        </span>
      )
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
      render: (_, record) => (
        <span>
          <span>
            {record.address}, {getLocationByCodeName(record.city, provinceMap)}, {record.country}
          </span>
        </span>
      )
    },
    {
      title: 'Số sao',
      dataIndex: 'star',
      key: 'star',
      render: (star: number) => <Tag color='gold'>{star ? `${star} ⭐` : 'Chưa có'}</Tag>
    },
    {
      title: 'Loại hình',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => <Tag color='blue'>{type.toUpperCase()}</Tag>
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Button type='link' onClick={() => navigate(`/owner/hotels/${record._id}`)}>
          Quản lý
        </Button>
      )
    }
  ]

  return (
    <div
      className='space-y-4'
    >
      <Space className='w-full justify-between'>
        <Title level={4} className='!mb-0'>
          Danh sách khách sạn
        </Title>
        <Button type='primary' onClick={() => navigate('/owner/hotels/register')}>
          + Thêm khách sạn mới
        </Button>
      </Space>

      <Table
        columns={columns}
        dataSource={hotels}
        rowKey='_id'
        pagination={{ pageSize: 5 }}
        bordered
        className='bg-white rounded-xl shadow'
      />
    </div>
  )
}
