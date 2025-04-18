/* eslint-disable @typescript-eslint/no-explicit-any */
import { Flex, Form, Select, Typography, Slider, Button, Checkbox } from 'antd';

const { Title } = Typography;
const { Option } = Select;

interface Props {
  handleChange: (field: string, value: any) => void;
  handleReset: () => void;
  filters: any;
}

const FilterRoom = ({ handleChange, handleReset, filters }: Props) => {
  const [form] = Form.useForm();

  return (
    <div className='border rounded-lg flex-grow'>
      <Form form={form} className='py-5 px-2 w-full'>
        <Flex gap='middle' vertical>
          <div className='mt-4'>
            <Title level={5}>Giá phòng</Title>
            <Form.Item name="priceRange" initialValue={[1, 2000000]}>
              <Slider
                range
                defaultValue={[1, 2000000]}
                min={1000000}
                max={10000000}
                step={10}
                className='w-full'
                onChange={(value) => handleChange('priceRange', value)}
              />
            </Form.Item>
            <div>
              Giá: VND {filters.priceRange[0].toLocaleString()} - VND {filters.priceRange[1].toLocaleString()}
            </div>
          </div>

          <div className='mt-4'>
            <Title level={5}>Xếp hạng khách sạn</Title>
            <Form.Item name="rating">
              <Checkbox.Group onChange={(value) => handleChange('rating', value)}>
                <Checkbox value={1}>1 sao</Checkbox>
                <Checkbox value={2}>2 sao</Checkbox>
                <Checkbox value={3}>3 sao</Checkbox>
                <Checkbox value={4}>4 sao</Checkbox>
                <Checkbox value={5}>5 sao</Checkbox>
              </Checkbox.Group>
            </Form.Item>
          </div>

          <div className='mt-4'>
            <Title level={5}>Tiện nghi</Title>
            <Form.Item name="selectedAmenities">
              <Select
                mode='multiple'
                placeholder='Chọn tiện nghi'
                className='w-full'
                allowClear
                onChange={(value) => handleChange('selectedAmenities', value)}
              >
                <Option value="Wi-Fi miễn phí">Wi-Fi miễn phí</Option>
                <Option value="Hồ bơi">Hồ bơi</Option>
                <Option value="Nhà hàng">Nhà hàng</Option>
                <Option value="Phòng gym">Phòng gym</Option>
                <Option value="Spa">Spa</Option>
                <Option value="Chỗ đậu xe">Chỗ đậu xe</Option>
                <Option value="Phòng họp">Phòng họp</Option>
                <Option value="Điều hòa">Điều hòa</Option>
                <Option value="Thang máy">Thang máy</Option>
                <Option value="Lễ tân 24/7">Lễ tân 24/7</Option>
              </Select>
            </Form.Item>
          </div>

          <div className='mt-4'>
            <Title level={5}>Loại chỗ ở</Title>
            <Form.Item name="roomType">
              <Select
                placeholder='Chọn loại chỗ ở'
                className='w-full'
                allowClear
                onChange={(value) => handleChange('roomType', value)}
              >
                <Option value=''>Chọn loại chỗ ở</Option>
                <Option value='hotel'>Khách sạn</Option>
                <Option value='resort'>Resort</Option>
                <Option value='apartment'>Căn hộ</Option>
              </Select>
            </Form.Item>
          </div>

          <Button
            type='primary'
            className='mt-4'
            onClick={() => {
              form.resetFields();
              handleReset();
            }}
          >
            Làm mới
          </Button>
        </Flex>
      </Form>
    </div>
  );
}

export default FilterRoom;
