/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLocation, useNavigate } from 'react-router-dom'
import RoomList from '../RoomList'
import { useQueryClient } from '@tanstack/react-query'
import { SearchRoomRequest } from '../../../hooks/room/types'
import { useCallback, useEffect, useState } from 'react'
import { useSearchRoom } from '../../../hooks/room/useSearchRoom'
import { ROOM } from '../../../service/constants'
import FilterRoom from '../SearchRoom/FilterRoom'
import { Button } from 'antd'
import { filter } from 'framer-motion/client'
const DEFAULT_LIMIT = 6
const SearchRoomResult = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const initialParams: SearchRoomRequest = location?.state || {}
  const [searchParams, setSearchParams] = useState({ ...initialParams, limit: DEFAULT_LIMIT })
  const { data, isLoading } = useSearchRoom(searchParams)
  const rooms = data?.data.rooms || []
  const total = data?.data.total || 0
  const onLoadMore = useCallback(() => {
    setSearchParams((prev) => ({ ...prev, limit: prev.limit + DEFAULT_LIMIT }))
  }, [])
  const [filters, setFilters] = useState({
    priceRange: [0, 0],
    rating: [],
    selectedAmenities: [],
    roomType: undefined
  })
  const handleChange = (field: string, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value
    }))
  }
  const handleReset = () => {
    setSearchParams({...initialParams, limit:DEFAULT_LIMIT});
    setFilters({
      priceRange: [0, 0],
      rating: [],
      selectedAmenities: [],
      roomType: undefined
    })
  }
  useEffect(() => {
    const numOfNights = new Date(searchParams.checkOutDate).getDate() - new Date(searchParams.checkInDate).getDate()
    const params = {
      minPrice: filters.priceRange[0] / numOfNights,
      maxPrice: filters.priceRange[1] / numOfNights,
      rating: filters.rating,
      amenities: filters.selectedAmenities,
      roomType: filters.roomType
    }
    setSearchParams((prev) => ({ ...prev, ...params }))
  }, [filters])
  useEffect(() => {
    queryClient.invalidateQueries([ROOM])
  }, [searchParams, queryClient])
  return (
    <div className='container mx-auto px-20 mt-[30px]'>
      <div className='grid grid-cols-1 md:grid-cols-12 gap-6 max-w-7xl'>
        <div className='md:col-span-3 h-full flex flex-col'>
  
          <FilterRoom handleChange={handleChange} filters={filters} handleReset={handleReset} />
        </div>
        <div className='md:col-span-9  '>
          <RoomList
            searchParams={searchParams}
            rooms={rooms}
            isLoading={isLoading}
            total={total}
            onLoadMore={onLoadMore}
          />
        </div>
      </div>
    </div>
  )
}

export default SearchRoomResult
