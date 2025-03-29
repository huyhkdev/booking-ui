
export interface SearchRoomRequest{
    checkInDate: string,
    checkOutDate: string,
    city: string,
    room: string,
    capacity: string,
    limit: number,
    
}
export interface CreateOrderBooking {
  totalGuests: number
  room: []
  checkInDate: string
  checkOutDate: string
  paymentMethod: string
}

