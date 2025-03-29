import { DatePicker, Form, Input } from 'antd'
import { CreateOrderBooking } from '../../hooks/room/types'
import moment from 'moment'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import axios from 'axios'
export default function Payment({ rooms }) {
  const [form] = Form.useForm()
  const [roomQuantities, setRoomQuantities] = useState([])
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const checkInDate = params.get('checkInDate')
    const checkOutDate = params.get('checkOutDate')
    const capacity = params.get('capacity')
    // Set các giá trị này vào form
    if (checkInDate) {
      form.setFieldsValue({
        checkInDate: moment(checkInDate)
      })
    }

    if (checkOutDate) {
      form.setFieldsValue({
        checkOutDate: moment(checkOutDate)
      })
    }

    if (capacity) {
      form.setFieldsValue({
        capacity: capacity
      })
    }
  }, [form])
  const handleSearchRoom = async (formValues: CreateOrderBooking) => {
    const rooms = Object.entries(roomQuantities).map(([id, quantity]) => ({
      id,
      quantity
    }))
    const params = {
      ...formValues,
      checkInDate: moment(new Date(formValues.checkInDate)).toISOString(),
      checkOutDate: moment(new Date(formValues.checkOutDate)).toISOString(),
      room: rooms,
      paymentMethod: 'credit_card'
    }
    try {
      const response = await axios.post('http://localhost:4000/api/v1/booking/createOrder', params)
      if (response.data.data && response.data.data.paymentUrl) {
        window.location.href = response.data.data.paymentUrl
      }
    } catch (error) {
      console.error('Đã xảy ra lỗi khi tạo booking:', error)
    }
  }

  const handleQuantityChange = (roomId: string, value: number) => {
    if (value < 0) {
      value = 0
    }

    setRoomQuantities((prev) => {
      const existingRoom = prev[roomId]

      if (existingRoom !== undefined) {
        return {
          ...prev,
          [roomId]: value
        }
      } else {
        return {
          ...prev,
          [roomId]: value
        }
      }
    })
  }
  const countMap = new Map()
  rooms.forEach((room) => {
    if (!countMap.has(room.name)) {
      countMap.set(room.name, 1)
    } else {
      countMap.set(room.name, countMap.get(room.name) + 1)
    }
  })
  const totalPrice = rooms.reduce((total: number, room: any) => {
    const quantity = roomQuantities[room._id] || 0
    return total + room.pricePerNight * quantity
  }, 0)
  const findRoomByName =(name: string)=> rooms?.find(room => room.name === name );
  return (
    <div className='main'>
      {/* <h3 className='font-bold text-4xl m-10'>Phòng Trống</h3> */}
      <Form form={form} onFinish={handleSearchRoom}>
        <div className='bg-white font-bold rounded-lg shadow-lg border-4 border-black mx-56'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4 p-3'>
            <div>
              <span className='text-gray-700 mb-1 block'>Ngày đặt Phòng</span>
              <Form.Item name='checkInDate' rules={[{ required: true, message: 'Vui lòng chọn ngày check-in!' }]}>
                <DatePicker className='w-full' format='DD/MM/YYYY' />
              </Form.Item>
            </div>
            <div>
              <span className='text-gray-700 mb-1 block'>Ngày trả phòng</span>
              <Form.Item name='checkOutDate' rules={[{ required: true, message: 'Vui lòng chọn ngày check-out!' }]}>
                <DatePicker className='w-full' format='DD/MM/YYYY' />
              </Form.Item>
            </div>
            <div>
              <span className='text-gray-700 mb-1 block '>Số lượng khách</span>
              <div className='flex gap-4 w-full'>
                <Form.Item name='capacity' rules={[{ required: true, message: 'Vui lòng chọn số lượng khách!' }]}>
                  <Input placeholder='số lượng khách' type='number' min={0} className='w-full' />
                </Form.Item>
              </div>
            </div>
          </div>
        </div>
        <h4 className='font-bold text-3xl mt-10  '>Tất Cả Các Loại Chỗ Nghỉ</h4>
        <div className='body_main'>
          <div className='form_detail_room'>
            <div className='heading_room'>
              <div className='heading_room_value'>Loại Phòng</div>
              <div className='heading_room_value'>Giá của phòng</div>
              <div className='heading_room_value'>Số Lượng Phòng</div>
            </div>
            <div className='body_room'>
          { [...countMap.keys()].map( key => {
            const targetRoom = findRoomByName(key);
          return  <div key={key} className='body_room_total'>
            <div className='body_room_value'>
             { `${key} (Tối đa ${targetRoom.capacity} Người)`}
            </div>
            <div className='body_room_value'>{Number(targetRoom.pricePerNight).toLocaleString()} VND</div>
            <Input
              suffix={"còn " +countMap.get(key) + " phòng"}
              placeholder='số lượng phòng'
              type='number'
              min={1}
              max={countMap.get(key)}
              className='w-[30%] mr-10'
              onChange={(e) => handleQuantityChange(targetRoom._id , Number(e.target.value))}
            />
          </div>


          }) }

            </div>
          </div>
          <div className='form_payment'>
            <div className='heading_payment'>Thanh Toán</div>
            <div className='payment_total'>
              <div className='payment_price_name'>Tổng Giá Phòng</div>
              <div className='payment_price'>{totalPrice.toLocaleString()} VND</div>

              <Form.Item>
                <button type='submit' className='btn_payment'>
                  Tôi Sẽ Đặt
                </button>
              </Form.Item>
            </div>
          </div>
        </div>
      </Form>
    </div>
  )
}
