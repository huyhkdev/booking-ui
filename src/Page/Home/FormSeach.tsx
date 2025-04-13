import { DatePicker, Form, Input, Select } from 'antd'
import { motion } from 'framer-motion'
import useProvince from '../../hooks/province/useProvince'
import { SearchRoomRequest } from '../../hooks/room/types'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
const vietnamProvinces = [
  { name: "Thành phố Hà Nội", codename: "thanh_pho_ha_noi" },
  { name: "Thành phố Hồ Chí Minh", codename: "thanh_pho_ho_chi_minh" },
  { name: "Thành phố Hải Phòng", codename: "thanh_pho_hai_phong" },
  { name: "Thành phố Đà Nẵng", codename: "thanh_pho_da_nang" },
  { name: "Thành phố Cần Thơ", codename: "thanh_pho_can_tho" },
  { name: "Thành phố Huế", codename: "thanh_pho_hue" },
  { name: "Tỉnh Bắc Giang", codename: "tinh_bac_giang" },
  { name: "Tỉnh Bắc Kạn", codename: "tinh_bac_kan" },
  { name: "Tỉnh Bạc Liêu", codename: "tinh_bac_lieu" },
  { name: "Tỉnh Bắc Ninh", codename: "tinh_bac_ninh" },
  { name: "Tỉnh Bà Rịa - Vũng Tàu", codename: "tinh_ba_ria_vung_tau" },
  { name: "Tỉnh Bến Tre", codename: "tinh_ben_tre" },
  { name: "Tỉnh Bình Dương", codename: "tinh_binh_duong" },
  { name: "Tỉnh Bình Định", codename: "tinh_binh_dinh" },
  { name: "Tỉnh Bình Phước", codename: "tinh_binh_phuoc" },
  { name: "Tỉnh Bình Thuận", codename: "tinh_binh_thuan" },
  { name: "Tỉnh Cà Mau", codename: "tinh_ca_mau" },
  { name: "Tỉnh Cao Bằng", codename: "tinh_cao_bang" },
  { name: "Tỉnh Đắk Lắk", codename: "tinh_dak_lak" },
  { name: "Tỉnh Đắk Nông", codename: "tinh_dak_nong" },
  { name: "Tỉnh Điện Biên", codename: "tinh_dien_bien" },
  { name: "Tỉnh Đồng Nai", codename: "tinh_dong_nai" },
  { name: "Tỉnh Đồng Tháp", codename: "tinh_dong_thap" },
  { name: "Tỉnh Gia Lai", codename: "tinh_gia_lai" },
  { name: "Tỉnh Hà Giang", codename: "tinh_ha_giang" },
  { name: "Tỉnh Hà Nam", codename: "tinh_ha_nam" },
  { name: "Tỉnh Hà Tĩnh", codename: "tinh_ha_tinh" },
  { name: "Tỉnh Hải Dương", codename: "tinh_hai_duong" },
  { name: "Tỉnh Hậu Giang", codename: "tinh_hau_giang" },
  { name: "Tỉnh Hòa Bình", codename: "tinh_hoa_binh" },
  { name: "Tỉnh Hưng Yên", codename: "tinh_hung_yen" },
  { name: "Tỉnh Khánh Hòa", codename: "tinh_khanh_hoa" },
  { name: "Tỉnh Kiên Giang", codename: "tinh_kien_giang" },
  { name: "Tỉnh Kon Tum", codename: "tinh_kon_tum" },
  { name: "Tỉnh Lai Châu", codename: "tinh_lai_chau" },
  { name: "Tỉnh Lâm Đồng", codename: "tinh_lam_dong" },
  { name: "Tỉnh Lạng Sơn", codename: "tinh_lang_son" },
  { name: "Tỉnh Lào Cai", codename: "tinh_lao_cai" },
  { name: "Tỉnh Long An", codename: "tinh_long_an" },
  { name: "Tỉnh Nam Định", codename: "tinh_nam_dinh" },
  { name: "Tỉnh Nghệ An", codename: "tinh_nghe_an" },
  { name: "Tỉnh Ninh Bình", codename: "tinh_ninh_binh" },
  { name: "Tỉnh Ninh Thuận", codename: "tinh_ninh_thuan" },
  { name: "Tỉnh Phú Thọ", codename: "tinh_phu_tho" },
  { name: "Tỉnh Phú Yên", codename: "tinh_phu_yen" },
  { name: "Tỉnh Quảng Bình", codename: "tinh_quang_binh" },
  { name: "Tỉnh Quảng Nam", codename: "tinh_quang_nam" },
  { name: "Tỉnh Quảng Ngãi", codename: "tinh_quang_ngai" },
  { name: "Tỉnh Quảng Ninh", codename: "tinh_quang_ninh" },
  { name: "Tỉnh Quảng Trị", codename: "tinh_quang_tri" },
  { name: "Tỉnh Sóc Trăng", codename: "tinh_soc_trang" },
  { name: "Tỉnh Sơn La", codename: "tinh_son_la" },
  { name: "Tỉnh Tây Ninh", codename: "tinh_tay_ninh" },
  { name: "Tỉnh Thái Bình", codename: "tinh_thai_binh" },
  { name: "Tỉnh Thái Nguyên", codename: "tinh_thai_nguyen" },
  { name: "Tỉnh Thanh Hóa", codename: "tinh_thanh_hoa" },
  { name: "Tỉnh Thừa Thiên Huế", codename: "tinh_thua_thien_hue" },
  { name: "Tỉnh Tiền Giang", codename: "tinh_tien_giang" },
  { name: "Tỉnh Trà Vinh", codename: "tinh_tra_vinh" },
  { name: "Tỉnh Tuyên Quang", codename: "tinh_tuyen_quang" },
  { name: "Tỉnh Vĩnh Long", codename: "tinh_vinh_long" },
  { name: "Tỉnh Vĩnh Phúc", codename: "tinh_vinh_phuc" },
  { name: "Tỉnh Yên Bái", codename: "tinh_yen_bai" }
];

const FormSearch = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()

  // const { data, isLoading } = useProvince()
  const provinces = vietnamProvinces;
  const cityOptions = provinces?.map((province) => {
    return {
      label: province.name,
      value: province.codename
    }
  })
  const handleSearchRoom = (formValues: SearchRoomRequest) => {
    const params = {
      ...formValues,
      checkInDate: moment(new Date(formValues.checkInDate)).format('YYYY-MM-DD'),
      checkOutDate: moment(new Date(formValues.checkOutDate)).format('YYYY-MM-DD')
    }
    form.resetFields()
    navigate('/roomlist', { state: params })
  }
  return (
    <div className='bg-white mx-4 md:mx-[20%] xl:mx-[25%] p-6 md:p-8 rounded-lg shadow-lg'>
      <div className='text-black text-lg flex items-center gap-2 font-bold pb-4 border-b border-gray-200'>
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='w-6 h-6'>
          <path d='M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z' />
          <path d='m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z' />
        </svg>
        <h1 className='uppercase text-xl md:text-2xl'>Tìm kiếm chỗ ở</h1>
      </div>
      <Form form={form} onFinish={handleSearchRoom} className='mt-6'>
        <div className='mb-4'>
          <span className='text-gray-700 mb-1 block capitalize'>Thành phố</span>
          <Form.Item name='city' rules={[{ required: true, message: 'Vui lòng nhập thành phố!' }]}>
            <Select
              placeholder="Chọn thành phố"
              showSearch
              optionFilterProp="label"
              options={cityOptions}
            />
          </Form.Item>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
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
        </div>

        <span className='text-gray-700 mb-1 block '>Số lượng khách và phòng</span>
        <div className='flex gap-4 w-full'>
          <Form.Item name='capacity' rules={[{ required: true, message: 'Vui lòng chọn số lượng khách!' }]}>
            <Input placeholder='số lượng khách' type='number' min={0} className='w-full' />
          </Form.Item>
          <Form.Item name='room' rules={[{ required: true, message: 'Vui lòng chọn số lượng khách!' }]}>
            <Input placeholder='số lượng phòng' type='number' min={0} className='w-full' />
          </Form.Item>
        </div>

        {/* Nút Submit */}
        <Form.Item>
          <motion.button
            type='submit'
            className='w-full bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary/90 transition'
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Tìm kiếm
          </motion.button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default FormSearch
