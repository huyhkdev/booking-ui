import { Modal, Form, Input, InputNumber, Checkbox, Upload, Button, Space, notification } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { useState, useEffect } from 'react'
import { Room } from '../../../hooks/room/useSearchRoom'
import { useRoomAmenities } from '../../../hooks/room/useRoomAmenities'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  open: boolean
  onClose: () => void
  onSubmitForm: (data: FormData) => void
  room?: Room | null
  loading?: boolean
}

export const RoomFormModal = ({ open, onClose, onSubmitForm, room, loading }: Props) => {
  const [form] = Form.useForm()
  const [fileList, setFileList] = useState<any[]>([])
  const roomAmenities = useRoomAmenities()

  useEffect(() => {
    if (open) resetForm()
  }, [room, open])

  const resetForm = () => {
    if (room) {
      form.setFieldsValue({
        name: room.name,
        roomNumber: room.roomNumber,
        type: room.type,
        pricePerNight: room.pricePerNight,
        capacity: room.capacity,
        amenities: room.amenities,
        isAvailable: room.isAvailable,
        description: room.description
      })
      const imageFiles =
        room.images?.map((url, idx) => ({
          uid: `${idx}`,
          name: `image-${idx}.jpg`,
          status: 'done',
          url
        })) || []
      setFileList(imageFiles)
    } else {
      form.resetFields()
      setFileList([])
    }
  }

  const handleSubmit = async () => {
    try {
      console.log(fileList)
      const values = await form.validateFields()
      const formData = new FormData()
      Object.entries(values).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((v) => formData.append(`${key}[]`, v))
        } else {
          formData.append(key, value ?? ('' as any))
        }
      })

      fileList.forEach((file) => {
        if (file.originFileObj) {
          formData.append('images', file.originFileObj)
        }
      })
      const oldImages = fileList.filter((file) => file.status === 'done' && file.url).map((file) => file.url!)
      formData.append('oldImages', JSON.stringify(oldImages))

      onSubmitForm(formData)
    } catch {
      notification.warning({
        message: 'Lỗi xác thực!',
        description: 'Vui lòng kiểm tra lại các trường bắt buộc.'
      })
    }
  }

  const handleFileChange = ({ fileList }: any) => setFileList(fileList)

  const handlePreview = async (file: any) => {
    let src = file.url
    if (!src) {
      src = await new Promise<string>((resolve) => {
        const reader = new FileReader()
        reader.readAsDataURL(file.originFileObj)
        reader.onload = () => resolve(reader.result as string)
      })
    }
    const imgWindow = window.open(src)
    imgWindow?.document.write(`<img src="${src}" />`)
  }

  return (
    <AnimatePresence>
      {open && (
        <Modal
          open={open}
          onCancel={onClose}
          footer={null}
          title={room ? 'Chỉnh sửa phòng' : 'Thêm phòng mới'}
          width={960}
          centered
          destroyOnClose
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className='max-h-[75vh] overflow-y-auto'
          >
            <Form form={form} layout='vertical' onFinish={handleSubmit} className='space-y-4'>
              <Space size='large' className='w-full flex-wrap' align='start'>
                <Form.Item
                  label='Tên phòng'
                  name='name'
                  rules={[{ required: true, message: 'Vui lòng nhập tên phòng!' }]}
                  style={{ flex: 1 }}
                >
                  <Input size='large' placeholder='VD: Phòng Deluxe 101' />
                </Form.Item>

                <Form.Item
                  label='Mã phòng / số phòng'
                  name='roomNumber'
                  rules={[{ required: true, message: 'Vui lòng nhập mã phòng!' }]}
                  style={{ flex: 1 }}
                >
                  <Input size='large' placeholder='VD: 101' />
                </Form.Item>
                <Form.Item
                  label='Giá mỗi đêm'
                  name='pricePerNight'
                  rules={[{ required: true, message: 'Vui lòng nhập giá!' }]}
                  style={{ flex: 1 }}
                >
                  <InputNumber<number>
                    className='w-full'
                    min={0}
                    size='large'
                    formatter={(value) => (value ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' đ' : '')}
                    parser={(value) => (value ? parseInt(value.replace(/\D/g, '')) : 0)}
                  />
                </Form.Item>

                <Form.Item
                  label='Sức chứa'
                  name='capacity'
                  rules={[
                    { required: true, message: 'Vui lòng nhập sức chứa!' },
                    { type: 'number', min: 1, max: 10, message: 'Sức chứa phải từ 1 đến 10!' }
                  ]}
                  style={{ flex: 1 }}
                >
                  <InputNumber className='w-full' min={1} max={10} size='large' />
                </Form.Item>
              </Space>

              <Form.Item label='Tiện nghi' name='amenities'>
                <Checkbox.Group>
                  <div className='flex flex-wrap gap-4'>
                    {roomAmenities.map((amenity) => (
                      <Checkbox key={amenity.label} value={amenity.label} className='flex items-center'>
                        {amenity.label}
                      </Checkbox>
                    ))}
                  </div>
                </Checkbox.Group>
              </Form.Item>

              <Form.Item label='Mô tả' name='description'>
                <Input.TextArea placeholder='Mô tả chi tiết về phòng' autoSize={{ minRows: 3 }} />
              </Form.Item>

              {room && (
                <Form.Item label='Tình trạng' name='isAvailable' valuePropName='checked'>
                  <Checkbox>Còn phòng</Checkbox>
                </Form.Item>
              )}

              <Form.Item
                label='Ảnh phòng'
                required
                validateStatus={fileList.length === 0 ? 'error' : ''}
                help={fileList.length === 0 ? 'Vui lòng tải lên ít nhất 1 ảnh!' : ''}
              >
                <Upload
                  listType='picture-card'
                  fileList={fileList}
                  onChange={handleFileChange}
                  onPreview={handlePreview}
                  beforeUpload={() => false}
                >
                  {fileList.length < 5 && <Button icon={<UploadOutlined />} size='large'></Button>}
                </Upload>
              </Form.Item>

              <div className='flex justify-end gap-2 pt-2 pb-5'>
                <Button onClick={onClose}>Hủy</Button>
                <Button type='primary' htmlType='submit' loading={loading}>
                  {room ? 'Cập nhật' : 'Tạo'}
                </Button>
              </div>
            </Form>
          </motion.div>
        </Modal>
      )}
    </AnimatePresence>
  )
}
