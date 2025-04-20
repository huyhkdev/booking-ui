import { useEffect, useState } from 'react';
import { CameraFilled } from '@ant-design/icons';
import { useGetUserProfile } from '../../hooks/auth/useFetchInfo';
import { useAccessToken } from '../../hooks/auth/useUserInfo';
import LoadingSpin from '../../Components/LoadingSpin';
import { Button, Image, notification, Modal, Rate, Input } from 'antd';
import { userUpdateProfile } from '../../hooks/auth/userUpdateProfile';
import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useUploadAvatar } from '../../hooks/auth/useUploadAvatar';
import { useUserBooking } from '../../hooks/booking/getUserBooking';
import { useReview } from '../../hooks/booking/reviewBooking';
import { useGenerateTravelItinerary } from '../../hooks/booking/generateTravelItinerary';
import * as XLSX from 'xlsx';


 function handleExportFile(response: any) {
  const { itinerary, recommendations } = response;
  const formattedData: any[] = [];

  // Lấy location đầu tiên nếu có
  const firstLocation = itinerary?.[0]?.activities?.[0]?.location || 'Không xác định';

  // Tiêu đề
  formattedData.push({
    Day: 'Lịch trình du lịch',
    Time: `Địa điểm: ${firstLocation}`,
    Activity: '',
    Details: ''
  });

  // Nội dung từng ngày
  itinerary.forEach((day: any) => {
    const dateStr = new Date(day.date).toLocaleDateString('vi-VN');
    formattedData.push({
      Day: `Ngày ${day.day} (${dateStr})`,
      Time: '',
      Activity: '',
      Details: ''
    });

    day.activities.forEach((activity: any) => {
      formattedData.push({
        Day: '',
        Time: activity.time,
        Activity: activity.title,
        Details: `${activity.description}\nĐịa điểm: ${activity.location}\nThời lượng: ${activity.duration}`
      });
    });
  });

  // Gợi ý chung
  formattedData.push({
    Day: 'Gợi ý chung',
    Time: '',
    Activity: '',
    Details: ''
  });

  formattedData.push({
    Day: '',
    Time: 'Di chuyển',
    Activity: '',
    Details: recommendations?.transportation || 'Không có'
  });

  formattedData.push({
    Day: '',
    Time: 'Ẩm thực',
    Activity: '',
    Details: recommendations?.dining || 'Không có'
  });

  formattedData.push({
    Day: '',
    Time: 'Lưu ý',
    Activity: '',
    Details: recommendations?.notes || 'Không có'
  });

  // Tạo file Excel
  const worksheet = XLSX.utils.json_to_sheet(formattedData);
  worksheet['!cols'] = [
    { width: 25 },
    { width: 25 },
    { width: 35 },
    { width: 70}
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Lịch trình');

  XLSX.writeFile(workbook, 'Lich_trinh_du_lich.xlsx');
}


const USER_ACTIVE_STATE = "active";
const Gender = {
  male: "Nam",
  female: "Nữ",
  other: "Khác"
};

const Profile = () => {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const token = useAccessToken();

  const { data, isLoading } = useGetUserProfile(token as string);
  const userDetails = data?.data?.data;
  const [userEdit, setUserEdit] = useState<any>(userDetails);
  const { data: bookingData, isLoading: bookingLoading } = useUserBooking(token as string);
  const bookings = bookingData?.data.data;

  const { mutate: generateMutate, isPending: generateLoading } = useGenerateTravelItinerary(token as string);

  const { mutate: uploadMutate, isPending: uploadingPending } = useUploadAvatar(token as string);
  const handleAvatarChange = (e: any) => {
    uploadMutate(e.target.files[0], {
      onSuccess: () => {
        notification.success({ message: "Cập nhật thông tin thành công!" });
        queryClient.invalidateQueries({ queryKey: ["userProfile"] });
        setIsEditing(false);
      },
    });
  };

  const { mutate, isPending } = userUpdateProfile(token as string);
  const handleEditButton = () => {
    if (!isEditing) {
      setIsEditing(true);
    } else {
      mutate(userEdit, {
        onSuccess: () => {
          notification.success({ message: "Cập nhật thông tin thành công!" });
          queryClient.invalidateQueries({ queryKey: ["userProfile"] });
          setIsEditing(false);
        },
      });
    }
  };

  const handleChangeProfile = (e: any) => {
    const atr = e.target.name;
    setUserEdit((user: any) => ({ ...user, [atr]: e.target.value }));
  };

  const isUserActive = userDetails?.state === USER_ACTIVE_STATE;

  useEffect(() => {
    setUserEdit({
      ...userDetails,
      dob: userDetails?.dob ? dayjs(userDetails.dob).format('YYYY-MM-DD') : '',
    });
  }, [userDetails]);

  // Review Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewContent, setReviewContent] = useState('');
  const [selectedBooking, setSelectedBooking] = useState<any>(null);

  const showReviewModal = (booking: any) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const { mutate: reviewMutate } = useReview(token as string);
  const handleReviewSubmit = () => {
    reviewMutate({ bookingId: selectedBooking._id, reviewRating, reviewContent },
      {
        onSuccess: () => {
          notification.success({
            message: 'Đánh giá thành công!',
          });

          setIsModalOpen(false);
          setReviewRating(0);
          setReviewContent('');
          setSelectedBooking(null);
          setTimeout(() => queryClient.invalidateQueries({ queryKey: ["userBooking"] }), 2000)

        },
      }
    )


  };
  const handleGenerate = (bookingId: string) => {
    generateMutate({ bookingId }, {
      onSuccess: (data) => {
        handleExportFile(data.data.data);
      }
    })
  }
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const renderAvatar = () => {
    if (uploadingPending) return <LoadingSpin />;
    return userDetails?.avatarUrl ? (
      <Image
        className='rounded-full w-full h-full object-cover'
        src={userDetails.avatarUrl}
        alt='Profile'
        preview={false}
      />
    ) : (
      <div className='rounded-full w-full h-full bg-gray-200 flex items-center justify-center'>
        <span className='text-gray-500'>No Image</span>
      </div>
    );
  };

  if (isLoading) return <LoadingSpin />;

  return (
    <div>
      <div className='bg-gray-100 min-h-screen flex justify-center my-10'>
        {userDetails && (
          <div className='max-w-4xl w-full bg-white p-6 rounded-lg shadow-lg mt-10'>
            <div className='flex items-center justify-between'>
              <h1 className='text-3xl font-bold'>Thông tin cá nhân</h1>
              <label className='relative w-16 h-16 cursor-pointer'>
                {renderAvatar()}
                <input type='file' className='absolute inset-0 w-full h-full opacity-0' onChange={handleAvatarChange} />
                <div className='absolute bottom-0 left-0 w-full bg-white bg-opacity-70 flex items-center justify-center rounded-b-full'>
                  <CameraFilled className='text-neutral-500' />
                </div>
              </label>
            </div>

            <div className='mt-6 space-y-4'>
              <div className='flex justify-between items-center border-t py-4'>
                <div>
                  <p className='font-medium text-gray-700'>Tên</p>
                  {isEditing ? (
                    <input type='text' name='fullName' value={userEdit?.fullName || ''} onChange={handleChangeProfile} className='border rounded p-2' />
                  ) : (
                    <p className='text-gray-500 mt-1'>{userDetails?.fullName}</p>
                  )}
                </div>
              </div>

              <div className='flex justify-between items-center border-t py-4'>
                <div>
                  <p className='font-medium text-gray-700'>Địa chỉ email</p>
                  <p className='text-gray-500 mt-1'>
                    {userDetails.email}
                    <span className={`p-1 ml-1 font-medium text-white ${isUserActive ? 'bg-green-700' : 'bg-red-700'} rounded`}>
                      {isUserActive ? 'Đã xác thực' : 'Chưa xác thực'}
                    </span>
                  </p>
                </div>
              </div>

              <div className='flex justify-between items-center border-t py-4'>
                <div>
                  <p className='font-medium text-gray-700'>Ngày sinh</p>
                  {isEditing ? (
                    <input type='date' name='dob' value={userEdit?.dob || ''} onChange={handleChangeProfile} className='border rounded p-2' />
                  ) : (
                    <p className='text-gray-500 mt-1'>
                      {userDetails?.dob ? new Date(userDetails.dob).toLocaleDateString('vi-VN') : 'Vui lòng cập nhật ngày sinh'}
                    </p>
                  )}
                </div>
              </div>

              <div className='flex justify-between items-center border-t py-4'>
                <div>
                  <p className='font-medium text-gray-700'>Giới tính</p>
                  {isEditing ? (
                    <select name='gender' onChange={handleChangeProfile} value={userEdit?.gender || ''} className='w-[200px]'>
                      <option value='unkown'>Chọn giới tính</option>
                      <option value='male'>Nam</option>
                      <option value='female'>Nữ</option>
                      <option value='other'>Khác</option>
                    </select>
                  ) : (
                    <p className='text-gray-500 mt-1'>{Gender[userDetails.gender as keyof typeof Gender] || 'Vui lòng cập nhật giới tính'}</p>
                  )}
                </div>
              </div>
            </div>

            <div className='flex justify-end mt-4'>
              <Button loading={isPending} onClick={handleEditButton} className={`text-white font-medium p-2 rounded ${isEditing ? 'bg-green-600' : 'bg-primary'}`}>
                {isEditing ? 'Lưu' : 'Chỉnh sửa'}
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="p-5">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">📝 Lịch sử đặt phòng</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bookings?.map((booking: any) => (
            <div key={booking._id} className="border rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white overflow-hidden">
              <img src={booking.room[0].images[0]} alt="room" className="w-full h-48 object-cover" />
              <div className="p-5 space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-xl font-semibold text-primary">{booking.room[0].name}</p>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${booking.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {booking.status === 'confirmed' ? 'Đã xác nhận' : booking.status}
                  </span>
                </div>
                <p className="text-gray-600 text-sm">🏨 {booking.room[0].hotel.name}</p>
                <div className="text-sm text-gray-700 space-y-1 mt-3">
                  <p>📅 <span className="font-medium">Nhận phòng:</span> {new Date(booking.checkInDate).toLocaleDateString('vi-VN')}</p>
                  <p>📤 <span className="font-medium">Trả phòng:</span> {new Date(booking.checkOutDate).toLocaleDateString('vi-VN')}</p>
                  <p>👥 <span className="font-medium">Khách:</span> {booking.totalGuests}</p>
                  <p>💰 <span className="font-medium">Tổng tiền:</span> <span className="text-primary font-semibold">{booking.totalPrice.toLocaleString('vi-VN')}₫</span></p>
                </div>
                {new Date() >= new Date(booking.checkOutDate) ? (
                  <button
                    disabled={booking.isReview}
                    className={`mt-4 w-full py-2 rounded-lg font-medium transition 
                 ${booking.isReview
                        ? 'bg-gray-400 text-white cursor-not-allowed'
                        : 'bg-primary text-white hover:bg-primary/90'}`}
                    onClick={() => showReviewModal(booking)}
                  >
                    Đánh giá
                  </button>
                ) : (
                  <Button onClick={() => handleGenerate(booking._id)} loading={generateLoading} className="mt-4 w-full py-2 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition">
                    AI gợi ý lịch trình
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal title="Đánh giá phòng" open={isModalOpen} onOk={handleReviewSubmit} onCancel={handleCancel} okText="Gửi đánh giá" cancelText="Hủy">
        <div className="space-y-4">
          <div>
            <p className="font-medium mb-1">Chọn số sao:</p>
            <Rate value={reviewRating} onChange={setReviewRating} />
          </div>
          <div>
            <p className="font-medium mb-1">Viết đánh giá:</p>
            <Input.TextArea
              rows={4}
              placeholder="Nhập nội dung đánh giá..."
              value={reviewContent}
              onChange={(e) => setReviewContent(e.target.value)}
              maxLength={500}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Profile;
