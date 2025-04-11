import {
  InfoCircleOutlined,
  HomeOutlined,
  PieChartOutlined,
  SettingOutlined,
  AppstoreOutlined,
  PlusCircleOutlined,
  BarChartOutlined
} from "@ant-design/icons"
import { MenuProps } from "antd"

export const getSidebarMenuItems = (pathname: string): MenuProps['items'] => {
  const isHotelDetail = /^\/owner\/hotels\/[^/]+$/.test(pathname)

  if (isHotelDetail) {
    // Menu dành cho trang chi tiết 1 khách sạn
    return [
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
  } else {
    // Menu dành cho trang owner/hotels
    return [
      {
        key: '1',
        icon: <AppstoreOutlined />,
        label: 'Tất cả khách sạn'
      },
      {
        key: '2',
        icon: <PlusCircleOutlined />,
        label: 'Thêm khách sạn'
      },
      {
        key: '3',
        icon: <BarChartOutlined />,
        label: 'Doanh thu'
      },
      {
        key: '4',
        icon: <SettingOutlined />,
        label: 'Cài đặt'
      }
    ]
  }
}
