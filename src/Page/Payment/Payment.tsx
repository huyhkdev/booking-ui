import { DatePicker, Form, Input } from 'antd'
import { CreateOrderBooking } from '../../hooks/room/types'
import moment from 'moment'
import { differenceInDays } from 'date-fns';
import { useEffect, useState } from 'react'
import axios from 'axios'
import {  useSearchParams } from 'react-router-dom';
import { useAccessToken } from '../../hooks/auth/useUserInfo';
export default function Payment({ rooms }: any) {
  const [form] = Form.useForm()
  const [roomQuantities, setRoomQuantities] = useState<any>([])
  const [searchParams] = useSearchParams();
  const token = useAccessToken();
  const checkOutDate = searchParams.get('checkOutDate');
  const checkInDate = searchParams.get('checkInDate');
  const capacity = searchParams.get('capacity');
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
      paymentMethod: 'credit_card',
      capacity,
    }
    try {
      const response = await axios.post('http://localhost:4000/api/v1/booking/createOrder', params, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (response.data.data && response.data.data.paymentUrl) {
        console.log(response.data.data);
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

    setRoomQuantities((prev: any) => {
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
  rooms.forEach((room: any) => {
    if (!countMap.has(room.name)) {
      countMap.set(room.name, 1)
    } else {
      countMap.set(room.name, countMap.get(room.name) + 1)
    }
  })
  const totalPrice = rooms.reduce((total: number, room: any) => {
    const quantity = roomQuantities[room._id] || 0
    return total + (room.pricePerNight * differenceInDays(new Date(checkOutDate as string), new Date(checkInDate as string))) * quantity
  }, 0)
  const findRoomByName = (name: string) => rooms?.find((room: any) => room.name === name);
  return (
    <div className='main'>
      {/* <h3 className='font-bold text-4xl m-10'>Phòng Trống</h3> */}
      <Form form={form} onFinish={handleSearchRoom}>
        <Form.Item hidden name='checkInDate' rules={[{ required: true, message: 'Vui lòng chọn ngày check-in!' }]}>
          <DatePicker className='w-full' format='DD/MM/YYYY' />
        </Form.Item>
        <Form.Item hidden name='checkOutDate' rules={[{ required: true, message: 'Vui lòng chọn ngày check-out!' }]}>
          <DatePicker className='w-full' format='DD/MM/YYYY' />
        </Form.Item>
        <h4 className='font-bold text-3xl mt-10  '>Tất Cả Các Loại Chỗ Nghỉ</h4>
        <div className='body_main'>
          <div className='form_detail_room'>
            <div className='heading_room'>
              <div className='heading_room_value'>Loại Phòng</div>
              <div className='heading_room_value'>Giá của phòng</div>
              <div className='heading_room_value'>Số Lượng Phòng</div>
            </div>
            <div className='body_room'>
              {[...countMap.keys()].map(key => {
                const targetRoom = findRoomByName(key);
                return <div key={key} className='body_room_total'>
                  <div className='body_room_value'>
                    {`${key} (Tối đa ${targetRoom.capacity} Người)`}
                  </div>
                  <div className='body_room_value'>{Number(targetRoom.pricePerNight).toLocaleString()} VND</div>
                  <Input
                    suffix={"còn " + countMap.get(key) + " phòng"}
                    placeholder='số lượng phòng'
                    type='number'
                    min={1}
                    max={countMap.get(key)}
                    className='w-[30%] mr-10'
                    onChange={(e) => handleQuantityChange(targetRoom._id, Number(e.target.value))}
                  />
                </div>


              })}

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
