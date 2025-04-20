import {
  InfoCircleOutlined,
  HomeOutlined,
  BarChartOutlined,
  SettingOutlined,
  AppstoreOutlined,
  StarOutlined,
  LineChartOutlined,
  WalletOutlined
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
        icon: <BarChartOutlined />,
        label: 'Thống kê'
      },
      {
        key: '4',
        icon: <StarOutlined />,
        label: 'Đánh giá'
      },
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
        icon: <LineChartOutlined />,
        label: 'Thống kê'
      },
      {
        key: '3',
        icon: <StarOutlined />,
        label: 'Đánh giá'
      },
      {
        key: '4',
        icon: <SettingOutlined />,
        label: 'Cài đặt'
      },
      {
        key: '5',
        icon: <WalletOutlined />,
        label: 'Ví tiền'
      }
    ]
  }
}
