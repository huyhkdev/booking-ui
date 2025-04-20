import { Breadcrumb, Layout, Menu, Spin } from 'antd'
import { useLocation, Link } from 'react-router-dom'
import { useOwnerHotels } from '../../hooks/owner/useOwnerHotels'
import { useState } from 'react'
import { getSidebarMenuItems, ListHotelTable, StatisticHotels } from '../../Components/Owner'
import { Header, Content } from 'antd/es/layout/layout'
import type { BreadcrumbProps } from 'antd'
import { motion, AnimatePresence } from 'framer-motion'
import ReviewManagement from '../../Components/Owner/ReviewManagement'
import { WalletManagement } from './WalletManagement/WalletManagement'

const { Sider } = Layout

export const ListHotel = () => {
  const location = useLocation()
  const menuItems = getSidebarMenuItems(location.pathname)
  const [selectedMenuKey, setSelectedMenuKey] = useState('1')
  const { data: hotels, isLoading } = useOwnerHotels()

  const breadcrumbItems: BreadcrumbProps['items'] = [
    {
      title: (
        <Link to='/owner/hotels' className='!text-black'>
          Quản lý chung
        </Link>
      )
    },
    {
      title:
        selectedMenuKey === '1'
          ? 'Danh sách khách sạn'
          : selectedMenuKey === '2'
            ? 'Thống kê'
            : selectedMenuKey === '3'
              ? 'Đánh giá'
              : 'Danh sách khách sạn'
    }
  ]

  const renderContent = () => {
    if (!hotels) return null

    switch (selectedMenuKey) {
      case '1':
        return <ListHotelTable hotels={hotels} />
      case '2':
        return <StatisticHotels />
      case '3':
        return <ReviewManagement />
      case '5':
        return <WalletManagement />
      default:
        return <ListHotelTable hotels={hotels} />
    }
  }

  if (isLoading || !hotels) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Spin size='large' />
      </div>
    )
  }

  return (
    <Layout className='min-h-screen'>
      <Sider breakpoint='lg' collapsedWidth='0' className='!bg-white'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2 }}
          className='text-center py-4 border-b'
        >
          <img
            src='https://png.pngtree.com/png-vector/20230302/ourmid/pngtree-dashboard-line-icon-vector-png-image_6626604.png'
            alt='Hotel Logo'
            className='h-16 mx-auto'
          />
        </motion.div>
        <Menu
          className='pr-5 pt-3 w-fit'
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className='bg-white rounded-xl p-6 shadow'
          >
            <AnimatePresence mode='wait'>
              <motion.div
                key={selectedMenuKey}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </Content>
      </Layout>
    </Layout>
  )
}
