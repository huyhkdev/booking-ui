import { Breadcrumb, Layout, Menu, Spin } from 'antd'
import { useLocation, Link } from 'react-router-dom'
import { useOwnerHotels } from '../../hooks/owner/useOwnerHotels'
import { useState } from 'react'
import { getSidebarMenuItems, ListHotelTable } from '../../Components/Owner'
import { Header, Content } from 'antd/es/layout/layout'

import type { BreadcrumbProps } from 'antd'

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
    }
  ]

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
        <div className='text-center py-4 border-b'>
          <img
            src='https://png.pngtree.com/png-vector/20230302/ourmid/pngtree-dashboard-line-icon-vector-png-image_6626604.png'
            alt='Hotel Logo'
            className='h-16 mx-auto'
          />
        </div>
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
          <ListHotelTable hotels={hotels} />
        </Content>
      </Layout>
    </Layout>
  )
}
