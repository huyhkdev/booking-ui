import { Button, Input, Modal } from 'antd'
import { useState } from 'react'

interface DeleteHotelSectionProps {
  hotelId: string
  hotelName: string
  onDeleted: () => void
}

const DeleteHotelSection = ({ hotelName, onDeleted }: DeleteHotelSectionProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [confirmName, setConfirmName] = useState('')

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = async () => {
    if (confirmName === hotelName) {
      await onDeleted()
      setIsModalVisible(false)
      setConfirmName('')
    }
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    setConfirmName('')
  }

  return (
    <div className='text-red-600'>
      <p>Bạn có chắc chắn muốn xóa khách sạn này không?</p>
      <p>Dữ liệu của các phòng cũng sẽ đồng thời bị xóa</p>
      <Button danger className='mt-4' onClick={showModal}>
        Xác nhận xóa
      </Button>

      <Modal
        title='Xác nhận xóa khách sạn'
        open={isModalVisible}
        onOk={handleOk}
        okText='Xác nhận xóa'
        okButtonProps={{ disabled: confirmName !== hotelName, danger: true }}
        cancelText='Hủy'
        onCancel={handleCancel}
      >
        <p className='pb-2'>
          Nhập chính xác tên khách sạn "<strong>{hotelName}</strong>" để xác nhận xóa.
        </p>
        <Input
          placeholder='Nhập tên khách sạn'
          value={confirmName}
          onChange={(e) => setConfirmName(e.target.value)}
        />
      </Modal>
    </div>
  )
}

export default DeleteHotelSection
