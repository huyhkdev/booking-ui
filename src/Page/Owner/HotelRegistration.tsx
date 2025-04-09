import { useState } from 'react'
import { Form, Input, Select, Button, Upload, notification, Checkbox, Space, Image } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

const { Option } = Select

export const HotelRegistration = () => {
  const [form] = Form.useForm()
  const [fileList, setFileList] = useState<any[]>([])

  const handleFileChange = (info: any) => {
    setFileList(info.fileList)
  }

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        console.log('Form values:', values)
        notification.success({
          message: 'Form Submitted Successfully'
        })
      })
      .catch((errorInfo) => {
        console.log('Form validation failed:', errorInfo)
      })
  }

  return (
    <div className='container mx-auto p-5'>
      <h1 className='text-2xl font-bold mb-4'>Hotel Registration</h1>

      <Form form={form} onFinish={handleSubmit} layout='vertical' className='size-8/12 mx-auto'>
        <Space className='flex justify-between'>
          <Space direction='vertical' style={{ gap: '16px' }} className='min-h-screen pt-5'>
            <Form.Item label='Name' name='name' rules={[{ required: true, message: 'Please input the name!' }]}>
              <Input placeholder='Enter hotel name' size='large' />
            </Form.Item>

            <Form.Item
              label='Address'
              name='address'
              rules={[{ required: true, message: 'Please input the address!' }]}
            >
              <Input placeholder='Enter address' size='large' />
            </Form.Item>

            <Space size='large'>
              <Form.Item label='City' name='city' rules={[{ required: true, message: 'Please input the city!' }]}>
                <Input placeholder='Enter city' size='large' />
              </Form.Item>

              <Form.Item
                label='Country'
                name='country'
                rules={[{ required: true, message: 'Please input the country!' }]}
              >
                <Input placeholder='Enter country' size='large' />
              </Form.Item>
            </Space>
            <Form.Item label='Type' name='type' rules={[{ required: true, message: 'Please select a type!' }]}>
              <Select placeholder='Select type' size='large'>
                <Option value='hotel'>Hotel</Option>
                <Option value='resort'>Resort</Option>
                <Option value='motel'>Motel</Option>
                <Option value='hostel'>Hostel</Option>
              </Select>
            </Form.Item>

            <Form.Item label='Long Description' name='longDescription'>
              <Input.TextArea placeholder='Provide a long description of the hotel' size='large' />
            </Form.Item>

            <Space size='large'>
              <Form.Item
                label='Phone Number'
                name='phoneNumber'
                rules={[{ required: true, message: 'Please input the phone number!' }]}
              >
                <Input placeholder='Enter phone number' size='large' />
              </Form.Item>

              <Form.Item label='Email' name='email' rules={[{ required: true, message: 'Please input the email!' }]}>
                <Input placeholder='Enter email' size='large' />
              </Form.Item>
            </Space>

            <Form.Item label='Website' name='website'>
              <Input placeholder='Enter website URL' size='large' />
            </Form.Item>
          </Space>

          <Space direction='vertical' style={{ gap: '16px' }} className='min-h-screen max-w-md'>
            <Form.Item label='Photos'>
            {fileList[0] && (
              <Image
                width={400}
                src={URL.createObjectURL(fileList[0].originFileObj)}
                alt="Uploaded Image"
              />
            )}
              <Upload
                fileList={fileList}
                onChange={handleFileChange}
                beforeUpload={() => false}
                listType='picture-card'
              >
                <Button icon={<UploadOutlined />} size='large'>
                </Button>
              </Upload>
            </Form.Item>

            <Form.Item label='Amenities'>
              <div className='flex space-x-6'>
                <div className='flex items-center space-x-2'>
                  <Checkbox value='Free Parking'>Free Parking</Checkbox>
                </div>
                <div className='flex items-center space-x-2'>
                  <Checkbox value='Free WiFi'>Free WiFi</Checkbox>
                </div>
                <div className='flex items-center space-x-2'>
                  <Checkbox value='Pool'>Pool</Checkbox>
                </div>
                <div className='flex items-center space-x-2'>
                  <Checkbox value='Gym'>Gym</Checkbox>
                </div>
              </div>
            </Form.Item>

            <Form.Item>
              <Button type='primary' htmlType='submit' size='large' className='w-full'>
                Submit
              </Button>
            </Form.Item>
          </Space>
        </Space>
      </Form>
    </div>
  )
}
