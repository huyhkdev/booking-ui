import { useState } from 'react'
import { Form, Input, Select, Button, Upload, notification, Checkbox, Space, Image, Spin, Tooltip, Rate } from 'antd'
import { ArrowLeftOutlined, InfoCircleOutlined, UploadOutlined } from '@ant-design/icons'
import useProvince from '../../../hooks/province/useProvince'
import './HotelRegistration.pcss'
import { httpErrorToToastAtr } from '../../../helpers/httpErrorToToastAtr'
import { useNavigate } from 'react-router-dom'
import { useHotelRegister } from '../../../hooks/owner'
import { AddressGuideModal } from '../../../Components/Owner'

const { Option } = Select

const amenitiesList = [
  { label: 'Bãi đỗ xe miễn phí', value: 'Bãi đỗ xe miễn phí' },
  { label: 'WiFi miễn phí', value: 'WiFi miễn phí' },
  { label: 'Hồ bơi', value: 'Hồ bơi' },
  { label: 'Phòng gym', value: 'Phòng gym' },
  { label: 'Nhà hàng', value: 'Nhà hàng' },
  { label: 'Lễ tân 24/7', value: 'Lễ tân 24/7' },
  { label: 'Dịch vụ phòng', value: 'Dịch vụ phòng' },
  { label: 'Dịch vụ giặt ủi', value: 'Dịch vụ giặt ủi' }
]

export const HotelRegistration = () => {
  const navigate = useNavigate()
  const { data: provinces, isLoading } = useProvince()
  const { mutate, isPending } = useHotelRegister()
  const [form] = Form.useForm()
  const [fileList, setFileList] = useState<any[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleFileChange = (info: any) => {
    setFileList(info.fileList)
  }

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields()
      const formData = new FormData()
      formData.append('country', 'Việt Nam')
      Object.entries(values).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((v) => formData.append(`${key}[]`, v))
        } else {
          formData.append(key, value ?? ('' as any))
        }
      })

      fileList.forEach((file) => {
        formData.append('images', file.originFileObj)
      })
      console.log(formData)

      mutate(formData, {
        onSuccess: () => {
          notification.success({
            message: 'Đăng khách sạn thành công!',
            description: 'Khách sạn của bạn đã được đăng lên hệ thống.'
          })
          navigate('/owner/hotels')
        },
        onError: (error) => {
          const [message, description] = httpErrorToToastAtr(error)
          notification.error({ message, description })
        }
      })
    } catch (err) {
      notification.warning({
        message: 'Lỗi xác thực form!',
        description: 'Vui lòng kiểm tra lại các trường bắt buộc.'
      })
    }
  }
  const handlePreview = async (file: any) => {
    let src = file.url
    if (!src) {
      src = await new Promise<string>((resolve) => {
        const reader = new FileReader()
        reader.readAsDataURL(file.originFileObj)
        reader.onload = () => resolve(reader.result as string)
      })
    }
    const image = new window.Image()
    image.src = src
    const imgWindow = window.open(src)
    if (imgWindow) {
      imgWindow.document.write(image.outerHTML)
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
    <div className='container mx-auto p-5'>
      <div className='flex gap-5 items-center mb-4'>
        <Tooltip title='Quay lại'>
          <ArrowLeftOutlined
            onClick={() => navigate(-1)}
            className='text-xl cursor-pointer hover:text-blue-600 transition'
          />
        </Tooltip>
        <h1 className='text-2xl font-bold'>Đăng ký khách sạn</h1>
      </div>

      <Form form={form} onFinish={handleSubmit} layout='vertical' className='size-8/12 mx-auto'>
        <Space className='flex justify-between'>
          <Space direction='vertical' style={{ gap: '16px' }} className='min-h-screen pt-5'>
            <Form.Item
              label='Tên khách sạn'
              name='name'
              rules={[{ required: true, message: 'Vui lòng nhập tên khách sạn!' }]}
            >
              <Input placeholder='Nhập tên khách sạn' size='large' />
            </Form.Item>

            <Form.Item label='Địa chỉ' name='address' rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}>
              <Input placeholder='Nhập địa chỉ cụ thể' size='large' />
            </Form.Item>

            <Space size='large' className='justify-between w-full'>
              <Form.Item
                className='min-w-56'
                label='Tỉnh/Thành phố'
                name='city'
                rules={[{ required: true, message: 'Vui lòng chọn tỉnh/thành phố!' }]}
              >
                <Select showSearch placeholder='Chọn tỉnh/thành phố' optionFilterProp='children' size='large'>
                  {provinces?.data.map((province) => (
                    <Option key={province.codename} value={province.codename}>
                      {province.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                className='min-w-56'
                label='Loại hình'
                name='type'
                rules={[{ required: true, message: 'Vui lòng chọn loại hình!' }]}
              >
                <Select placeholder='Chọn loại hình' size='large'>
                  <Option value='hotel'>Khách sạn</Option>
                  <Option value='resort'>Resort</Option>
                  <Option value='motel'>Nhà nghỉ</Option>
                  <Option value='hostel'>Ký túc xá</Option>
                </Select>
              </Form.Item>
            </Space>

            <Form.Item label='Mô tả ngắn' name='description'>
              <Input placeholder='Nhập mô tả chi tiết về khách sạn' size='large' />
            </Form.Item>

            <Form.Item label='Mô tả chi tiết' name='longDescription'>
              <Input.TextArea placeholder='Nhập mô tả chi tiết về khách sạn' size='large' />
            </Form.Item>

            <Space size='large' className='justify-between w-full'>
              <Form.Item
                label='Số điện thoại'
                name='phoneNumber'
                rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
              >
                <Input placeholder='Nhập số điện thoại liên hệ' size='large' />
              </Form.Item>

              <Form.Item
                className='min-w-56'
                label='Email'
                name='email'
                rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
              >
                <Input placeholder='Nhập địa chỉ email' size='large' />
              </Form.Item>
            </Space>

            <Form.Item label='Website' name='website'>
              <Input placeholder='Nhập địa chỉ website (nếu có)' size='large' />
            </Form.Item>
          </Space>

          <Space direction='vertical' style={{ gap: '16px' }} className='min-h-screen max-w-md'>
            <Form.Item
              label='Ảnh khách sạn'
              required
              validateStatus={fileList.length === 0 ? 'error' : ''}
              help={fileList.length === 0 ? 'Vui lòng tải lên ít nhất một ảnh!' : ''}
            >
              {fileList[0] && (
                <Image width={350} src={URL.createObjectURL(fileList[0].originFileObj)} alt='Uploaded Image' />
              )}
              <Upload
                fileList={fileList}
                onChange={handleFileChange}
                beforeUpload={() => false}
                onPreview={handlePreview}
                listType='picture-card'
              >
                <Button icon={<UploadOutlined />} size='large' />
              </Upload>
            </Form.Item>

            <Form.Item label='Link Map' name='mapLink' className='mb-0' tooltip='Dán link Google Maps sau khi sao chép'>
              <div className='flex items-center space-x-2'>
                <Input placeholder='Dán link Google Maps tại đây' size='large' />
                <Tooltip title='Hướng dẫn lấy link Google Maps'>
                  <button
                    type='button'
                    onClick={() => setIsModalOpen(true)}
                    className='text-blue-500 hover:text-blue-700 text-lg'
                  >
                    <InfoCircleOutlined style={{ fontSize: '18px' }} />
                  </button>
                </Tooltip>
              </div>
            </Form.Item>

            <Form.Item label='Tiện nghi' name='amenities'>
              <Checkbox.Group>
                <Space className='flex flex-wrap gap-6'>
                  {amenitiesList.map((item) => (
                    <div key={item.value} className='flex items-center space-x-2'>
                      <Checkbox value={item.value}>{item.label}</Checkbox>
                    </div>
                  ))}
                </Space>
              </Checkbox.Group>
            </Form.Item>
            <Form.Item
              label='Xếp hạng sao'
              name='star'
              rules={[{ required: true, message: 'Vui lòng chọn số sao cho khách sạn!' }]}
            >
              <Rate allowClear allowHalf />
            </Form.Item>

            <Form.Item>
              <Button loading={isPending} type='primary' htmlType='submit' size='large' className='w-full'>
                Gửi thông tin
              </Button>
            </Form.Item>
          </Space>
        </Space>
      </Form>
      <AddressGuideModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
