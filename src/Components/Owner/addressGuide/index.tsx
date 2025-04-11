import { Modal, Timeline, Button, Space } from 'antd'

interface AddressGuideModalProps {
  open: boolean
  onClose: () => void
}

export const AddressGuideModal: React.FC<AddressGuideModalProps> = ({ open, onClose }) => {
  return (
    <Modal open={open} onCancel={onClose} footer={null} centered width={450}>
      <div className='p-4'>
        <h2 className='text-xl font-semibold text-center text-blue-600 mb-4'>Hướng dẫn lấy địa chỉ</h2>

        <Timeline>
          <Timeline.Item>
            <p className='font-medium'>Mở ứng dụng Google Maps trên điện thoại</p>
            <Space className='flex items-center mt-2'>
              <img
              src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC10aIGcrdtvbwpYkeboJsf9YXZ0K6cwbOMw&s'
              alt='Google Maps'
              className='w-6 h-6'
              />
              <p className='text-center'>Googles Map</p>
            </Space>
          </Timeline.Item>

          <Timeline.Item>
            <p className='font-medium'>Tìm kiếm địa chỉ nhà</p>
            <div className='bg-gray-100 rounded-md p-2 mt-2 text-sm'>Ví dụ: 59 lê thiện trị</div>
          </Timeline.Item>

          <Timeline.Item>
            <p className='font-medium'>
              Chia sẻ liên kết, bấm chọn nút <span className='text-blue-500'>“Chia sẻ”</span>
            </p>
          </Timeline.Item>

          <Timeline.Item>
            <p className='font-medium'>
              Sao chép liên kết, bấm chọn nút <span className='text-blue-500'>“Chép liên kết”</span>
            </p>
            <div className='bg-blue-100 p-2 rounded-md mt-2 text-sm'>📋 Chép liên kết</div>
          </Timeline.Item>

          <Timeline.Item>
            <p className='font-medium'>Dán liên kết vào ô nhập liệu</p>
            <div className='bg-gray-100 p-2 mt-2 rounded-md text-sm'>https://maps.app.goo.gl/xxxxx</div>
          </Timeline.Item>
        </Timeline>

        <div className='text-center mt-4'>
          <Button type='primary' onClick={onClose}>
            Đã hiểu
          </Button>
        </div>
      </div>
    </Modal>
  )
}
