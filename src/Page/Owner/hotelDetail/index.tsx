import { Breadcrumb, Layout, Menu, Spin } from 'antd'
import { HomeOutlined, SettingOutlined, PieChartOutlined, InfoCircleOutlined } from '@ant-design/icons'
import { Link, useParams } from 'react-router-dom'
import { useOwnerHotelDetail } from '../../../hooks/owner'
import { Header, Content } from 'antd/es/layout/layout'
import { useState } from 'react'
import type { BreadcrumbProps, MenuProps } from 'antd'
import { HotelInfo } from '../../../Components/Owner'
import { ListRoom } from '../../../Components/Owner/listRoom'

const { Sider } = Layout

export const HotelDetail = () => {
  const { hotelId } = useParams<{ hotelId: string }>()
  const { data: hotel, isLoading } = useOwnerHotelDetail(hotelId as string)

  const [selectedMenuKey, setSelectedMenuKey] = useState('1')

  if (isLoading || !hotel) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Spin size='large' />
      </div>
    )
  }

  const breadcrumbItems: BreadcrumbProps['items'] = [
    {
      title: <Link to='/owner/hotels'>Trang chủ</Link>
    },
    {
      title: hotel.name
    }
  ]

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

  const renderContent = () => {
    switch (selectedMenuKey) {
      case '1':
        return <HotelInfo hotel={hotel} />
      case '2':
        return (
          <ListRoom rooms={hotel.rooms}/>
        )
      case '3':
        return (
          <div>
            <h2 className='text-xl font-bold mb-4'>Thống kê người thuê</h2>
            <p>
              {/* <strong>Tổng lượt đánh giá:</strong> {hotel.reviews?.length} */}
              <p>Chức năng đang phát triển...</p>
            </p>
          </div>
        )
      case '4':
        return (
          <div>
            <h2 className='text-xl font-bold mb-4'>Cài đặt</h2>
            <p>Chức năng đang phát triển...</p>
          </div>
        )
      default:
        return null
    }
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
