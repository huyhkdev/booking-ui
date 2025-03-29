import React from 'react'

export default function Hotel() {
  const categories = [
    {
      title: 'Phòng Gần Biển',
      imageUrl: 'https://via.placeholder.com/150', // Thay bằng link hình ảnh thực tế
      description: 'Những phòng nghỉ gần biển, thuận tiện cho việc tắm biển và thư giãn.',
      price: 'Từ US$50'
    },
    {
      title: 'Phòng Gần Trung Tâm',
      imageUrl: 'https://via.placeholder.com/150', // Thay bằng link hình ảnh thực tế
      description: 'Các phòng nghỉ gần trung tâm thành phố, dễ dàng di chuyển đến các địa điểm du lịch.',
      price: 'Từ US$60'
    }
  ]

  return (
    <div className='container mx-auto p-5'>
      <h1 className='text-2xl font-bold mb-4'>Phân loại phòng</h1>
      <div className='flex gap-4'>
        {categories.map((category, index) => (
          <div key={index} className='border rounded-lg overflow-hidden shadow-lg flex-1'>
            <img src={category.imageUrl} alt={category.title} className='w-full h-48 object-cover' />
            <div className='p-4'>
              <h2 className='text-xl font-semibold'>{category.title}</h2>
              <p className='text-gray-600 mb-2'>{category.description}</p>
              <span className='font-bold'>{category.price}</span>
              <div className='mt-4'>
                <button className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600'>Xem chi tiết</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
