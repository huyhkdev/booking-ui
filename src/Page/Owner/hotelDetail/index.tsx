import { Breadcrumb, Layout, Menu, notification, Spin } from 'antd'
import { HomeOutlined, SettingOutlined, PieChartOutlined, InfoCircleOutlined } from '@ant-design/icons'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Hotel, useDeleteHotel, useOwnerHotelDetail, useUpdateHotel } from '../../../hooks/owner'
import { Header, Content } from 'antd/es/layout/layout'
import { useEffect, useState } from 'react'
import type { BreadcrumbProps, MenuProps } from 'antd'
import { HotelInfo } from '../../../Components/Owner'
import { HotelDetailSetting } from '../../../Components/Owner/hotelDetail/settings'
import { useAccessToken } from '../../../hooks/auth/useUserInfo'
import { useQueryClient } from '@tanstack/react-query'
import { ListRoomManager } from '../../../Components/Owner/room/ListRoomManager'
import { Statistics } from '../../../Components/Owner/hotelDetail/statistics'

const { Sider } = Layout

const menuItems: MenuProps['items'] = [
  {
    key: '1',
    icon: <InfoCircleOutlined />,
    label: 'Thông tin chính'
  },
  {
    key: '2',
    icon: <HomeOutlined />,
    label: 'Danh sách phòng'
  },
  {
    key: '3',
    icon: <PieChartOutlined />,
    label: 'Thống kê'
  },
  {
    key: '4',
    icon: <SettingOutlined />,
    label: 'Cài đặt'
  }
]

export const HotelDetail = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate();
  const { hotelId } = useParams<{ hotelId: string }>()
  const { data: hotel, isLoading } = useOwnerHotelDetail(hotelId as string)
  const token = useAccessToken()
  const { mutate: updateHotelMutate, isPending: updateLoading } = useUpdateHotel(token as string, hotelId as string)
  const { mutate: deleteHotelMutate } = useDeleteHotel(token as string, hotelId as string)
  const [selectedMenuKey, setSelectedMenuKey] = useState('1')
  
  useEffect(() => {
    queryClient.removeQueries({ queryKey: ['rooms-hotel-owner'] })
  },[])

  if (isLoading || !hotel) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Spin size='large' />
      </div>
    )
  }

  const breadcrumbItems: BreadcrumbProps['items'] = [
    {
      title: <Link to='/owner/hotels'>Quản lý chung</Link>
    },
    {
      title: hotel.name
    }
  ]

  const renderContent = () => {
    switch (selectedMenuKey) {
      case '1':
        return <HotelInfo hotel={hotel} />
      case '2':
        return <ListRoomManager hotelId={hotelId as string} />
      case '3':
        return <Statistics hotelId={hotelId as string} />
      case '4':
        return (
          <HotelDetailSetting
            hotel={hotel}
            onUpdate={onHotelUpdate}
            onDeleteImage={onDeleteImage}
            onDeleteHotel={onDeleteHotel}
            updateLoading={updateLoading}
          />
        )
      default:
        return null
    }
  }

  const onHotelUpdate = async (values: Partial<Hotel> | FormData): Promise<void> => {
    updateHotelMutate(values, {
      onSuccess: () => {
        notification.success({ message: 'Cập nhật thành công!' })
        queryClient.invalidateQueries({ queryKey: ['hotel-detail', hotelId] })
        setSelectedMenuKey('1')
      },
      onError: (error) => {
        notification.error({ message: 'Thất bại!', description: error.message })
      }
    })
  }

  const onDeleteImage = async (newImages: string[]) => {
    updateHotelMutate(
      { images: newImages },
      {
        onSuccess: () => {
          notification.success({ message: 'Xóa ảnh thành công!' })
          queryClient.invalidateQueries({ queryKey: ['hotel-detail'] })
        },
        onError: (error) => {
          notification.error({ message: 'Xóa ảnh thất bại!', description: error.message })
        }
      }
    )
  }
  const onDeleteHotel = async () => {
    deleteHotelMutate(undefined, {
          onSuccess: () => {
            notification.success({ message: 'Xóa khách sạn thành công!' })
            queryClient.invalidateQueries({ queryKey: ['hotels-owner'] })
            navigate("/owner/hotels")
          },
          onError: (error: any) => {
            notification.error({ message: 'Xóa khách sạn thất bại!', description: error.message })
          }
        })
  }

  return (
    <Layout className='min-h-screen'>
      <Sider breakpoint='lg' collapsedWidth='0' className='!bg-white'>
        <div className='text-center py-4 border-b'>
          <img src={hotel.images[0]} alt='Hotel Logo' className='h-16 mx-auto' />
        </div>
        <Menu
          theme='light'
          mode='inline'
          className='pr-5 pt-3 w-fit'
          selectedKeys={[selectedMenuKey]}
          onClick={(e) => setSelectedMenuKey(e.key)}
          items={menuItems}
        />
      </Sider>

      <Layout>
        <Header className='bg-white shadow px-4 content-center'>
          <Breadcrumb items={breadcrumbItems} />
        </Header>

        <Content className='p-6 bg-gray-100'>
          <div className='bg-white rounded-xl p-6 shadow'>{renderContent()}</div>
        </Content>
      </Layout>
    </Layout>
  )
}
