import { DatePicker, Form, Input } from "antd";
import { motion } from 'framer-motion';
import moment from 'moment'
import { SearchRoomRequest } from "../../hooks/room/types";
interface Props {
  initParams: SearchRoomRequest
}
const SearchHorizontal  =({initParams} :Props)=>{
  console.log(initParams);
    const [form] = Form.useForm()
   return  <div className='bg-white font-bold rounded-lg shadow-lg border-1 border-black mt-3'>
    <Form className=''>
      <div className='flex justify-around gap-4 p-3'>
        <div>
          <span className='text-gray-700 mb-1 block'>Ngày đặt Phòng</span>
          <Form.Item name='checkInDate' rules={[{ required: true, message: 'Vui lòng chọn ngày check-in!' }]}>
              <DatePicker
                className='w-full'
                format='DD/MM/YYYY'
                disabledDate={(current) => {
                  return current && current < moment().startOf('day')
                }}
              />
            </Form.Item>
        </div>
        <div>
          <span className='text-gray-700 mb-1 block'>Ngày trả phòng</span>
          <Form.Item
              name='checkOutDate'
              rules={[
                { required: true, message: 'Vui lòng chọn ngày check-out!' },
                {
                  validator: (_, value) => {
                    const checkInDate = form.getFieldValue('checkInDate')
                    if (!value || !checkInDate || value.isAfter(checkInDate)) {
                      return Promise.resolve()
                    }
                    return Promise.reject(new Error('Ngày check-out phải lớn hơn ngày check-in!'))
                  }
                }
              ]}
            >
              <DatePicker className='w-full' format='DD/MM/YYYY' />
            </Form.Item>
        </div>
        <div>
          <span className='text-gray-700 mb-1 block '>Số lượng khách và phòng</span>
          <div className='flex gap-4 w-full'>
            <Form.Item name='capacity' rules={[{ required: true, message: 'Vui lòng chọn số lượng khách!' }]}>
              <Input placeholder='số lượng khách' type='number' min={0} className='w-full' />
            </Form.Item>
            <Form.Item name='room' rules={[{ required: true, message: 'Vui lòng chọn số lượng khách!' }]}>
              <Input placeholder='số lượng phòng' type='number' min={0} className='w-full' />
            </Form.Item>
          </div>
        </div>
        <Form.Item>
          <motion.button
            type='submit'
            className='w-full bg-primary text-white px-4 py-2 mt-5 rounded-lg font-semibold hover:bg-primary/90 transition'
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Tìm kiếm
          </motion.button>
        </Form.Item>
      </div>
    </Form>
  </div>
}
export default SearchHorizontal;