import {  useState } from 'react'
import { TypeInfor } from '../../Types/Users.type'
import { Select } from 'antd'
import { CameraFilled } from '@ant-design/icons'
import { Image } from 'antd'

const Profile = () => {
  const [userDetails, setUserDetails] = useState<TypeInfor | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [updatedInfo, setUpdatedInfo] = useState<any>({})

  const [imageUrl, setImageUrl] = useState<string>('')
  // const fetchUserDetail = async () => {
  //   auth.onAuthStateChanged(async (user) => {
  //     if (user) {
  //       await reload(user)

  //       if (user.emailVerified) {
  //         const userRef = doc(db, 'Users', user.uid)
  //         await setDoc(userRef, { emailVerified: true }, { merge: true })
  //       }
  //       try {
  //         const docRef = doc(db, 'Users', user.uid)
  //         const docSnap = await getDoc(docRef)
  //         if (docSnap.exists()) {
  //           const data = docSnap.data()
  //           setUserDetails(docSnap.data() as TypeInfor)
  //           setUpdatedInfo(docSnap.data())
  //           setImageUrl(data.photoURL || null)
  //         }
  //       } catch (error) {
  //         console.error('Error fetching user data:', error)
  //       }
  //     }
  //   })
  // }
  console.log(userDetails)
  const handleEdit = () => {
    setIsEditing(true)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (e: any) => {
    // Cập nhật thông tin trong updatedInfo
    setUpdatedInfo({ ...updatedInfo, [e.target.name]: e.target.value })
  }

  const handleGenderChange = (value: string) => {
    setUpdatedInfo({ ...updatedInfo, gender: value })
  }

  // const handleSave = async () => {
  //   try {
  //     const user = auth.currentUser
  //     if (user) {
  //       await setDoc(
  //         doc(db, 'Users', user.uid),
  //         {
  //           ...updatedInfo,
  //           updatedAt: serverTimestamp()
  //         },
  //         { merge: true }
  //       )
  //       setUserDetails(updatedInfo)
  //       setIsEditing(false)
  //       window.location.reload()
  //     }
  //   } catch (error) {
  //     console.error('Error updating user data:', error)
  //   }
  // }

  // async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
  //   const file = event.target.files?.[0]
  //   if (file) {
  //     try {
  //       const storage = getStorage(app)
  //       const storageRef = ref(storage, 'images/' + file.name)
  //       await uploadBytes(storageRef, file)
  //       const downloadUrl = await getDownloadURL(storageRef)
  //       console.log(downloadUrl)
  //       setImageUrl(downloadUrl)
  //       const user = auth.currentUser
  //       if (user) {
  //         const userRef = doc(db, 'Users', user.uid)
  //         await setDoc(userRef, { photoURL: downloadUrl }, { merge: true })
  //       }
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  // }

  // useEffect(() => {
  //   fetchUserDetail()
  // }, [])

  return (
    <div>
      <div className='bg-gray-100 min-h-screen flex justify-center my-10'>
        {userDetails ? (
          <div className='max-w-4xl w-full bg-white p-6 rounded-lg shadow-lg mt-10'>
            <div className='flex items-center justify-between'>
              <h1 className='text-3xl font-bold'>Thông tin cá nhân</h1>
              <div className='relative w-16 h-16'>
                {imageUrl ? (
                  <Image
                    className='rounded-full w-full h-full object-cover'
                    src={imageUrl}
                    alt='Profile'
                    preview={false} // Disable preview if not needed
                  />
                ) : (
                  <div className='rounded-full w-full h-full bg-gray-200 flex items-center justify-center'>
                    <span className='text-gray-500'>No Image</span>
                  </div>
                )}
                <input
                  type='file'
                  className='absolute inset-0 rounded-full w-full h-full opacity-0 cursor-pointer'
                  // onChange={handleFileChange}
                />

                <div className='absolute bottom-0 left-0 w-full   bg-opacity-70 flex items-center justify-center rounded-b-full'>
                  <CameraFilled className='text-neutral-500' />
                </div>
              </div>
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
                      name='displayName'
                      value={updatedInfo.displayName || ''}
                      onChange={handleChange}
                      className='border rounded p-2'
                    />
                  ) : (
                    <p className='text-gray-500 mt-1'>{userDetails.displayName}</p>
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
                      className={`p-1 ml-1 font-medium text-white ${
                        userDetails.emailVerified ? 'bg-green-700 rounded' : 'bg-red-700 rounded'
                      }`}
                    >
                      {userDetails.emailVerified ? 'Đã xác thực' : 'Chưa xác thực'}
                    </span>
                  </p>
                </div>
              </div>

              {/* Phone Number */}
              <div className='flex justify-between items-center border-t py-4'>
                <div>
                  <p className='font-medium text-gray-700'>Số điện thoại</p>
                  {isEditing ? (
                    <input
                      type='text'
                      name='phoneNumber'
                      value={updatedInfo.phoneNumber || ''}
                      onChange={handleChange}
                      className='border rounded p-2'
                    />
                  ) : (
                    <p className='text-gray-500 mt-1'>{userDetails.phoneNumber}</p>
                  )}
                </div>
              </div>

              {/* Birth Date */}
              <div className='flex justify-between items-center border-t py-4'>
                <div>
                  <p className='font-medium text-gray-700'>Ngày sinh</p>
                  {isEditing ? (
                    <input
                      type='date'
                      name='birthDate'
                      value={updatedInfo.birthDate || ''}
                      onChange={handleChange}
                      className='border rounded p-2'
                    />
                  ) : (
                    <p className='text-gray-500 mt-1'>{userDetails.birthDate || 'Nhập ngày sinh của bạn'}</p>
                  )}
                </div>
              </div>

              {/* Gender */}
              <div className='flex justify-between items-center border-t py-4'>
                <div>
                  <p className='font-medium text-gray-700'>Giới tính</p>
                  {isEditing ? (
                    <Select
                      id='gender-select'
                      value={updatedInfo.gender || 'Chọn giới tính'}
                      onChange={handleGenderChange}
                      className='w-[200px]'
                    >
                      <Select.Option value='Nam'>Nam</Select.Option>
                      <Select.Option value='Nữ'>Nữ</Select.Option>
                      <Select.Option value='Khác'>Khác</Select.Option>
                    </Select>
                  ) : (
                    <p className='text-gray-500 mt-1'>{userDetails.gender || 'Chọn giới tính'}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Single Button at the Bottom */}
            <div className='flex justify-end mt-4'>
              <button
                // onClick={isEditing ? handleSave : handleEdit}
                className={`text-white font-medium p-2 rounded ${isEditing ? 'bg-green-600' : 'bg-primary'}`}
              >
                {isEditing ? 'Lưu' : 'Chỉnh sửa'}
              </button>
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
