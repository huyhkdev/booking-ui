import { useEffect, useState } from 'react'
import { CameraFilled } from '@ant-design/icons'
import { useGetUserProfile } from '../../hooks/auth/useFetchInfo'
import { useAccessToken } from '../../hooks/auth/useUserInfo'
import LoadingSpin from '../../Components/LoadingSpin'
import { Button, Image, notification } from 'antd'
import { userUpdateProfile } from '../../hooks/auth/userUpdateProfile'
import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import axios from 'axios'
const USER_ACTIVE_STATE = "active";
const Gender = {
  'male': "Nam",
  'female': "Nữ",
  'other': "Khác"
}
const Profile = () => {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const token = useAccessToken();
  const { data, isLoading } = useGetUserProfile(token as string);
  const userDetails = data?.data?.data;
  const [userEdit, setUserEdit] = useState<any>(userDetails);
  const uploadImage = (files: FileList): void => {
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", "<your upload preset>");
  
    axios
      .post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_FIREBASE_PROJECT_ID}/image/upload`, formData)
      .then((response) => {
        const imageUrl = response.data.secure_url;
        // handleChangeAvatar(imageUrl); 
      })
      .catch((error) => {
        console.error("Upload failed:", error);
      });
  };
 
  const handleAvatarChange = (e) => {
    uploadImage(e.target.files);
  }
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
      setIsEditing(false);
    }
  }
  const handleChangeProfile = (e: any) => {
    const atr = e.target.name;
    setUserEdit((user: any) => ({ ...user, [atr]: e.target.value }));
  }
  const isUserActive = userDetails?.state === USER_ACTIVE_STATE;

  useEffect(() => {
    setUserEdit({
      ...userDetails,
      dob: userDetails?.dob ? dayjs(userDetails.dob).format('YYYY-MM-DD') : '',
    });
  }, [userDetails])
  if (isLoading) return <LoadingSpin />
  return (
    <div>
      <div className='bg-gray-100 min-h-screen flex justify-center my-10'>
        {userDetails ? (
          <div className='max-w-4xl w-full bg-white p-6 rounded-lg shadow-lg mt-10'>
            <div className='flex items-center justify-between'>
              <h1 className='text-3xl font-bold'>Thông tin cá nhân</h1>
              <label className='relative w-16 h-16 cursor-pointer'>
                {userDetails?.avatarUrl ? (
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
                )}

                <input
                  type='file'
                  className='absolute inset-0 w-full h-full opacity-0'
                  onChange={handleAvatarChange}
                />

                <div className='absolute bottom-0 left-0 w-full bg-white bg-opacity-70 flex items-center justify-center rounded-b-full'>
                  <CameraFilled className='text-neutral-500' />
                </div>
              </label>

            </div>
            <p className='text-gray-500 mt-2'>
              Cập nhật thông tin của bạn và tìm hiểu các thông tin này được sử dụng ra sao.
            </p>

            {/* Information Rows */}
            <div className='mt-6 space-y-4'>
              {/* Name */}
              <div className='flex justify-between items-center border-t py-4'>
                <div>
                  <p className='font-medium text-gray-700'>Tên</p>
                  {isEditing ? (
                    <input
                      type='text'
                      name='fullName'
                      value={userEdit?.fullName || ''}
                      onChange={handleChangeProfile}
                      className='border rounded p-2'
                    />
                  ) : (
                    <p className='text-gray-500 mt-1'>{userDetails?.fullName}</p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className='flex justify-between items-center border-t py-4'>
                <div>
                  <p className='font-medium text-gray-700 '>Địa chỉ email</p>
                  <p className='text-gray-500 mt-1'>
                    {userDetails.email}
                    <span
                      className={`p-1 ml-1 font-medium text-white ${isUserActive ? 'bg-green-700 rounded' : 'bg-red-700 rounded'
                        }`}
                    >
                      {isUserActive ? 'Đã xác thực' : 'Chưa xác thực'}
                    </span>
                  </p>
                </div>
              </div>

              {/* Phone Number */}

              {/* Birth Date */}
              <div className='flex justify-between items-center border-t py-4'>
                <div>
                  <p className='font-medium text-gray-700'>Ngày sinh</p>
                  {isEditing ? (
                    <input
                      type='date'
                      name='dob'
                      value={userEdit?.dob || ''}
                      onChange={handleChangeProfile}
                      className='border rounded p-2'
                    />
                  ) : (
                    <p className='text-gray-500 mt-1'>
                      {userDetails?.dob
                        ? new Date(userDetails.dob).toLocaleDateString('vi-VN')
                        : 'Vui lòng cập nhật ngày sinh'}
                    </p>

                  )}
                </div>
              </div>

              {/* Gender */}
              <div className='flex justify-between items-center border-t py-4'>
                <div>
                  <p className='font-medium text-gray-700'>Giới tính</p>
                  {isEditing ? (
                    <select
                      name='gender'
                      onChange={handleChangeProfile}
                      value={userEdit?.gender || 'Vui lòng cập nhật giới tính'}
                      className='w-[200px]'
                    >
                      <option value='male'>Nam</option>
                      <option value='female'>Nữ</option>
                      <option value='other'>Khác</option>
                    </select>
                  ) : (
                    <p className='text-gray-500 mt-1'>{Gender[userDetails.gender as string] || 'Vui lòng cập nhật giới tính'}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Single Button at the Bottom */}
            <div className='flex justify-end mt-4'>
              <Button
                loading={isPending}
                onClick={handleEditButton}
                className={`text-white font-medium p-2 rounded ${isEditing ? 'bg-green-600' : 'bg-primary'}`}
              >
                {isEditing ? 'Lưu' : 'Chỉnh sửa'}
              </Button>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}

export default Profile
