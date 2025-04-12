import { Table, Button, Typography, Space, Spin, Popconfirm, notification } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { RoomFormModal } from './RoomFormModal'
import { httpErrorToToastAtr } from '../../../helpers/httpErrorToToastAtr'
import { useQueryClient } from '@tanstack/react-query'
import { useRoomsByHotelId, Room, useCreateRoom, useDeleteRoom, useUpdateRoom } from '../../../hooks/room'

const { Title } = Typography

interface ListRoomProps {
  hotelId: string
}

export const ListRoomManager = ({ hotelId }: ListRoomProps) => {
  const queryClient = useQueryClient()
  const { data: rooms, isLoading } = useRoomsByHotelId(hotelId)
  const [openModal, setOpenModal] = useState(false)
  const [editingRoom, setEditingRoom] = useState<Room | null>(null)
  const { mutate: createRoomMutate, isPending: isCreatePending } = useCreateRoom()
  const { mutate: updateRoomMutate, isPending: isUpdatePending } = useUpdateRoom(editingRoom?._id || '')
  const { mutate: deleteRoomMutate } = useDeleteRoom()
  const handleAdd = () => {
    setEditingRoom(null)
    setOpenModal(true)
  }

  const handleEdit = (room: Room) => {
    setEditingRoom(room)
    setOpenModal(true)
  }

  const handleDelete = (roomId: string) => {
    // TODO: call delete mutation
    deleteRoomMutate(roomId, {
      onSuccess: () => {
        notification.success({
          message: 'Xóa phòng thành công!',
          description: 'Phòng của bạn đã được xóa.'
        })
        queryClient.invalidateQueries({ queryKey: ['rooms-hotel-owner'] })
      },
      onError: (error) => {
        const [message, description] = httpErrorToToastAtr(error)
        notification.error({ message, description })
      }
    })
  }

  const handleSubmit = (formData: FormData) => {
    if (editingRoom) {
      updateRoomMutate(formData, {
        onSuccess: () => {
          notification.success({
            message: 'Cập nhật phòng thành công!',
            description: 'Thông tin phòng đã được cập nhật.'
          })
          setOpenModal(false)
          queryClient.invalidateQueries({ queryKey: ['rooms-hotel-owner'] })
        },
        onError: (error) => {
          const [message, description] = httpErrorToToastAtr(error)
          notification.error({ message, description })
        }
      })
    } else {
      formData.append('hotel', hotelId)
      createRoomMutate(formData, {
        onSuccess: () => {
          notification.success({
            message: 'Đăng phòng thành công!',
            description: 'Phòng của bạn đã được đăng lên hệ thống.'
          })
          setOpenModal(false)
          queryClient.invalidateQueries({ queryKey: ['rooms-hotel-owner'] })
        },
        onError: (error) => {
          const [message, description] = httpErrorToToastAtr(error)
          notification.error({ message, description })
        }
      })
    }
  }

  const columns = [
    {
      title: 'Ảnh',
      key: 'image',
      render: (_: any, room: Room) => {
        const imageUrl = room.images?.[0]
        return imageUrl ? (
          <img src={imageUrl} alt={room.name} className='mx-auto w-16 h-16 object-cover rounded-md shadow-sm border' />
        ) : (
          <p className='text-gray-400 italic text-center'>Không có ảnh</p>
        )
      }
    },
    {
      title: 'Tên phòng',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Giá (VNĐ)',
      dataIndex: 'pricePerNight',
      key: 'pricePerNight',
      render: (pricePerNight: number) => (pricePerNight ? pricePerNight.toLocaleString() : 0)
    },
    {
      title: 'Số người',
      dataIndex: 'capacity',
      key: 'capacity'
    },
    {
      title: 'Trạng thái',
      dataIndex: 'isAvailable',
      key: 'isAvailable',
      render: (available: boolean) =>
        available ? (
          <span className='text-green-600 font-medium'>Có sẵn</span>
        ) : (
          <span className='text-red-500 font-medium'>Hết phòng</span>
        )
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_: any, room: Room) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(room)}>
            Sửa
          </Button>
          <Popconfirm
            title='Xác nhận xoá phòng này?'
            onConfirm={() => handleDelete(room._id)}
            okText='Xoá'
            cancelText='Huỷ'
          >
            <Button danger icon={<DeleteOutlined />}>
              Xoá
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ]

  if (isLoading || !rooms) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Spin size='large' />
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className='space-y-6'
    >
      <div className='flex justify-between items-center'>
        <Title level={4} className='!mb-0'>
          Danh sách phòng
        </Title>
        <Button type='primary' icon={<PlusOutlined />} onClick={handleAdd}>
          Thêm phòng mới
        </Button>
      </div>

      <Table
        dataSource={rooms}
        columns={columns}
        rowKey='_id'
        pagination={{ pageSize: 10 }}
        bordered
        className='shadow-md rounded-2xl'
      />

      <RoomFormModal
        loading={isCreatePending || isUpdatePending}
        onSubmitForm={handleSubmit}
        open={openModal}
        onClose={() => setOpenModal(false)}
        room={editingRoom}
      />
    </motion.div>
  )
}
