import { Button, Card, Form, Input, Modal, Select, Space, Spin, Upload, UploadFile } from 'antd'
import { motion } from 'framer-motion'
import { useState } from 'react'
import {
  SaveOutlined,
  SettingOutlined,
  PictureOutlined,
  DeleteOutlined,
  EditOutlined,
  UploadOutlined
} from '@ant-design/icons'
import { Hotel } from '../../../../hooks/owner'
import ImgCrop from 'antd-img-crop'
import useProvince from '../../../../hooks/province/useProvince'
import DeleteHotelSection from './DeleteHotel'
import useAmenities from '../../../../hooks/hotel/useAmenities'

const { Option } = Select
const { TextArea } = Input

interface HotelSettingProps {
  hotel: Hotel
  onUpdate: (updatedHotel: Partial<Hotel>) => Promise<void>
  onDeleteImage: (url: string[]) => void
  onDeleteHotel: () => void
  updateLoading: boolean
}

type SettingTab = 'info' | 'image' | 'advanced' | 'delete'

export const HotelDetailSetting = ({
  hotel,
  onUpdate,
  onDeleteImage,
  onDeleteHotel,
  updateLoading
}: HotelSettingProps) => {
  const [form] = Form.useForm()
  const [activeTab, setActiveTab] = useState<SettingTab>('info')
  const { data: provinces, isLoading } = useProvince()
  const { data: amenities } = useAmenities()
  const [fileList, setFileList] = useState<UploadFile[]>(
    hotel.images.map((url, index) => ({
      uid: String(index),
      name: `image-${index + 1}.jpg`,
      status: 'done',
      url
    }))
  )
  const handleSubmit = async (values: any) => {
    Modal.confirm({
      title: 'Xác nhận cập nhật',
      content: 'Bạn có chắc chắn muốn cập nhật thông tin khách sạn?',
      okText: 'Cập nhật',
      cancelText: 'Hủy',
      onOk: async () => {
        try {
          const imageUrls = fileList.filter((f) => f.status === 'done' && f.url).map((f) => f.url!)

          await onUpdate({
            ...values,
            images: imageUrls
          })
        } catch (error) {
          console.log(error)
        }
      }
    })
  }

  const handleRemoveImage = (file: UploadFile): boolean => {
    Modal.confirm({
      title: 'Xác nhận xóa ảnh',
      content: 'Bạn có chắc muốn xóa ảnh này không?',
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk: () => {
        const newFileList = fileList.filter((f) => f.uid !== file.uid)
        const newImages = newFileList.map((f) => f.url!)
        onDeleteImage(newImages)
        setFileList((prev) => prev.filter((f) => f.uid !== file.uid))
      }
    })
    return false
  }

  const handleImageSubmit = () => {
    const oldImages = fileList.filter((file) => file.status === 'done' && file.url).map((file) => file.url!)

    const newImages = fileList.filter((file) => file.originFileObj).map((file) => file.originFileObj as File)

    const formData = new FormData()

    formData.append('oldImages', JSON.stringify(oldImages))

    newImages.forEach((file) => {
      formData.append('images', file)
    })

    Modal.confirm({
      title: 'Xác nhận cập nhật ảnh',
      content: 'Bạn có chắc chắn muốn cập nhật lại danh sách ảnh?',
      okText: 'Cập nhật',
      cancelText: 'Hủy',
      onOk: async () => {
        try {
          await onUpdate(formData as any)
        } catch (error) {
          console.error(error)
        }
      }
    })
  }

  const renderInfoForm = () => (
    <Form
      form={form}
      layout='vertical'
      initialValues={hotel}
      onFinish={handleSubmit}
    >
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <Form.Item
          label='Tên khách sạn'
          name='name'
          rules={[{ required: true, message: 'Vui lòng nhập tên khách sạn' }]}
        >
          <Input size='large' />
        </Form.Item>

        <Form.Item label='Email' name='email'>
          <Input type='email' size='large' />
        </Form.Item>

        <Form.Item label='Số điện thoại' name='phoneNumber'>
          <Input size='large' />
        </Form.Item>

        <Form.Item label='Website' name='website'>
          <Input size='large' />
        </Form.Item>

        <Form.Item label='Địa chỉ' name='address'>
          <Input size='large' />
        </Form.Item>

        <Form.Item label='Thành phố' name='city'>
          <Select showSearch placeholder='Chọn tỉnh/thành phố' optionFilterProp='children' size='large'>
            {provinces?.data.map((province) => (
              <Option key={province.codename} value={province.codename}>
                {province.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label='Quốc gia' name='country'>
          <Input size='large' />
        </Form.Item>
        <Form.Item label='Tiện nghi' name='amenities'>
          <Select
            mode='multiple'
            placeholder='Chọn tiện nghi'
            options={amenities.map((a) => ({ label: a.label, value: a.value }))}
            size='large'
          />
        </Form.Item>
      </div>

      <Form.Item label='Mô tả ngắn' name='description'>
        <TextArea rows={2} size='large' />
      </Form.Item>

      <Form.Item label='Mô tả chi tiết' name='longDescription'>
        <TextArea rows={4} size='large' />
      </Form.Item>

      <Form.Item>
        <Button type='primary' htmlType='submit' loading={updateLoading} icon={<SaveOutlined />}>
          Lưu thay đổi
        </Button>
      </Form.Item>
    </Form>
  )

  const renderImageManager = () => (
    <div>
      <ImgCrop rotationSlider>
        <Upload
          listType='picture-card'
          fileList={fileList}
          onChange={({ fileList: newList }) => setFileList(newList)}
          onPreview={(file) => window.open(file.url || '', '_blank')}
          onRemove={handleRemoveImage}
          beforeUpload={() => false} // tránh upload auto
        >
          {fileList.length < 8 && <UploadOutlined />}
        </Upload>
      </ImgCrop>
      <p className='text-gray-500 mt-2'>Tối đa 8 ảnh. Ảnh đầu tiên sẽ là ảnh đại diện chính.</p>
      <Button
        type='primary'
        icon={<SaveOutlined />}
        loading={updateLoading}
        className='mt-4'
        onClick={handleImageSubmit}
      >
        Lưu ảnh
      </Button>
    </div>
  )

  const renderContent = () => {
    switch (activeTab) {
      case 'info':
        return renderInfoForm()
      case 'image':
        return renderImageManager()
      case 'advanced':
        return <div>⚙️ Tính năng nâng cao (sẽ thêm sau)</div>
      case 'delete':
        return <DeleteHotelSection hotelId={hotel._id} hotelName={hotel.name} onDeleted={onDeleteHotel} />
      default:
        return null
    }
  }

  if (isLoading || !provinces) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Spin size='large' />
      </div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <Card title='Cài đặt khách sạn' bordered={false} className='shadow-md rounded-2xl'>
        <Space className='mb-4' wrap>
          <Button
            icon={<EditOutlined />}
            onClick={() => setActiveTab('info')}
            ghost
            className={`border-none shadow-none ${
              activeTab === 'info'
                ? '!bg-blue-500 !text-white hover:!bg-blue-600h focus:!bg-blue-600'
                : '!bg-gray-100 !text-black hover:!bg-blue-100h focus:!bg-blue-100'
            } transition-all duration-200 rounded-lg px-4 py-2`}
          >
            Cập nhật thông tin
          </Button>

          <Button
            icon={<PictureOutlined />}
            onClick={() => setActiveTab('image')}
            ghost
            className={`border-none shadow-none ${
              activeTab === 'image'
                ? '!bg-blue-500 !text-white hover:!bg-blue-600h focus:!bg-blue-600'
                : '!bg-gray-100 !text-black hover:!bg-blue-100h focus:!bg-blue-100'
            } transition-all duration-200 rounded-lg px-4 py-2`}
          >
            Quản lý ảnh
          </Button>

          <Button
            icon={<SettingOutlined />}
            onClick={() => setActiveTab('advanced')}
            ghost
            className={`border-none shadow-none ${
              activeTab === 'advanced'
                ? '!bg-blue-500 !text-white hover:!bg-blue-600h focus:!bg-blue-600'
                : '!bg-gray-100 !text-black hover:!bg-blue-100h focus:!bg-blue-100'
            } transition-all duration-200 rounded-lg px-4 py-2`}
          >
            Nâng cao
          </Button>

          <Button
            icon={<DeleteOutlined />}
            onClick={() => setActiveTab('delete')}
            ghost
            className={`border-none shadow-none ${
              activeTab === 'delete'
                ? '!bg-red-600 !text-white hover:!bg-red-700 focus:!bg-red-700'
                : '!bg-red-100 !text-red-700 hover:!bg-red-200 focus:!bg-red-200'
            } transition-all duration-200 rounded-lg px-4 py-2`}
          >
            Xóa khách sạn
          </Button>
        </Space>

        {renderContent()}
      </Card>
    </motion.div>
  )
}
