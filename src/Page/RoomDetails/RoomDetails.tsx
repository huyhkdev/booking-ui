import { Typography, Empty, Button, Avatar } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { Rate } from 'antd';
import Payment from '../Payment/Payment';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingElement from '../../Components/LoadingElement';

const { Title } = Typography;

const RoomDetails = () => {
  const { hotelId } = useParams<{ hotelId: string }>();
  const params = new URLSearchParams(window.location.search);
  const checkInDate = params.get('checkInDate');
  const checkOutDate = params.get('checkOutDate');
  const [hotel, setHotel] = useState<any>(null);
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState<any>([]);
  const [showAllReviews, setShowAllReviews] = useState(false); // Điều khiển hiển thị tất cả reviews

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const hotelData = await axios.get(`http://localhost:4000/api/v1/hotels/${hotelId}?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`);
        setHotel(hotelData.data.data);
        setRooms(hotelData.data.data.rooms);
        setReviews(hotelData.data.data.reviews);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchHotelDetails();
  }, [hotelId]);

  if (isLoading) return <LoadingElement />;

  // Lọc số lượng đánh giá hiển thị tùy thuộc vào trạng thái showAllReviews
  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 3);

  return (
    <div className="main">
      <div className="container mx-auto my-5">
        <header className="flex justify-between items-center">
          <Title level={2}> {hotel?.name} </Title>
          <div className="text-lg flex gap-5 cursor-pointer"></div>
        </header>
        <body>
          {/* Image */}
          <div className="grid grid-cols-5 gap-4">
            <div className="col-span-2">
              <img src={hotel?.images[0]} alt="Large Image" className="w-full h-full object-cover rounded-lg" />
            </div>
            <div className="col-span-3">
              <div className="grid grid-cols-2 gap-2">
                <img src={hotel?.images[1]} alt="Small Image 1" className="w-full h-auto rounded-lg" />
                <img src={hotel?.images[2]} alt="Small Image 2" className="w-full h-auto rounded-lg" />
                <img src={hotel?.images[3]} alt="Small Image 3" className="w-full h-auto rounded-lg" />
                <img src={hotel?.images[4]} alt="Small Image 4" className="w-full h-auto rounded-lg" />
                <img src={hotel?.images[5]} alt="Small Image 4" className="w-full h-auto rounded-lg" />
              </div>
            </div>
          </div>
          {/* Content */}
          <div className="mt-5 grid grid-cols-4 cursor-pointer">
            <div className="col-span-3 mx-10">
              {/* Introduction */}
              <div className="mt-3">
                <Title level={3}>
                  <HomeOutlined /> Giới thiệu về chỗ ở này
                </Title>
                <Title level={5}>{hotel?.description}</Title>
                <Title level={5}>{hotel?.address}</Title>
                <Title level={5}>{hotel?.amenities[0]}</Title>
                <Title level={5}>{hotel?.amenities[1]}</Title>
                <Title level={5}>{hotel?.amenities[2]}</Title>
                <Title level={5}>{hotel?.amenities[3]}</Title>
              </div>
              {/* Description */}
              <h3 className="text-lg font-bold">Mô tả</h3>
              <Title level={5}>{hotel?.longDescription}</Title>
            </div>
          </div>
          <Payment rooms={rooms} />

          {/* Reviews Section */}
          <div className="mt-5 border-t pt-3">
            <h3 className="text-xl font-bold">Đánh giá phòng</h3>
            {reviews.length === 0 ? (
              <Empty description="Không có đánh giá" />
            ) : (
              <div className="grid grid-cols-2 gap-4 mt-2">
                {displayedReviews.map((review: any, index: number) => (
                  <div key={index} className="border p-2">
                    <div className="flex items-center">
                      {/* User Avatar */}
                      <Avatar src={review.user.avatarUrl} size={40} />
                      <p className="text-lg font-bold ml-2">{review.user.fullName}</p>
                    </div>
                    <p className="text-lg">Ngày đánh giá: {new Date(review.createdAt).toLocaleDateString()}</p>
                    <Rate allowHalf defaultValue={review.rating} />
                    <p className="text-lg">“{review.comment}”</p>
                  </div>
                ))}
              </div>
            )}
            {reviews.length > 3 && !showAllReviews && (
              <Button className='mt-1' type="link" onClick={() => setShowAllReviews(true)}>
                Hiển thị tất cả
              </Button>
            )}
            {showAllReviews && reviews.length > 3 && (
              <Button  className='mt-1' type="link" onClick={() => setShowAllReviews(false)}>
                Thu gọn
              </Button>
            )}
          </div>
        </body>
      </div>
    </div>
  );
};

export default RoomDetails;
