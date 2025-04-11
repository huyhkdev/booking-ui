export interface Amenity {
    label: string
    value: string
    icon?: string
  }
  
  const staticAmenities: Amenity[] = [
    { label: 'Wi-Fi miễn phí', value: 'Wi-Fi miễn phí' },
    { label: 'Chỗ đậu xe', value: 'Chỗ đậu xe' },
    { label: 'Hồ bơi', value: 'Hồ bơi' },
    { label: 'Phòng gym', value: 'Phòng gym' },
    { label: 'Điều hòa', value: 'Điều hòa' },
    { label: 'Thang máy', value: 'Thang máy' },
    { label: 'Phòng họp', value: 'Phòng họp' },
    { label: 'Nhà hàng', value: 'Nhà hàng' },
    { label: 'Spa', value: 'Spa' },
    { label: 'Lễ tân 24/7', value: 'Lễ tân 24/7' }
  ]
  
  const useAmenities = () => {
    return { data: staticAmenities }
  }
  
  export default useAmenities
  