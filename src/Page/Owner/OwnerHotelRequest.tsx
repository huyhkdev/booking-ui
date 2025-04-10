import { useEffect, useState } from 'react'
import { FileChangeEvent, OwnerUploadCV } from '../../Components/Owner'
import { notification, Spin } from 'antd'
import { httpErrorToToastAtr } from '../../helpers/httpErrorToToastAtr'
import { useInfoRequestOwner, useOwnerRegister } from '../../hooks/owner'
import { useNavigate } from 'react-router-dom'

export const OwnerHotelRequest = () => {
  const navigate = useNavigate()
  const [file, setFile] = useState<File | null>(null)
  const [userRole, setUserRole] = useState<string>('user')
  const [isPopupVisible, setIsPopupVisible] = useState(false)

  const { mutate, isPending } = useOwnerRegister()
  const { data: infor, isLoading } = useInfoRequestOwner()

  const inforRequest = infor?.data?.data?.infoRequest

  const handleFileChange = (e: FileChangeEvent) => {
    const selectedFile = e.target.files[0]
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile)
    } else {
      alert('Please upload a valid PDF file.')
    }
  }

  const handleSubmit = () => {
    const formData = new FormData()
    formData.append('hotelInfoFileUrl', file as any)
    if (file) {
      mutate(formData, {
        onSuccess: () => {
          notification.success({
            message: 'CV của bạn đã được tải lên thành công!',
            description: 'Cảm ơn bạn đã gửi CV. Chúng tôi sẽ xem xét và liên hệ với bạn trong thời gian sớm nhất.'
          })
          window.location.reload()
        },
        onError: (error) => {
          console.log(error)

          const [message, description] = httpErrorToToastAtr(error)
          notification.error({
            message,
            description
          })
        }
      })
    } else {
      notification.error({
        message: 'Please upload a valid CV file.'
      })
    }
  }

  useEffect(() => {
    const user = JSON.parse(String(localStorage.getItem('userInfo')))
    if (user && user.role === 'owner') {
      navigate('/owner/hotels')
    } else {
      setUserRole(user.role)
    }
    if (!isLoading) {
      inforRequest?.status ? setIsPopupVisible(false) : setIsPopupVisible(true)
    }
  }, [inforRequest])
  
  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Spin size='large' />
      </div>
    )
  }

  return (
    <div className='container mx-auto p-5'>
      <h1 className='text-2xl font-bold mb-4'>Đăng khách sạn</h1>

      {userRole === 'user' &&
        (!inforRequest?.status ? (
          <>
            <div className='alert alert-warning'>Bạn cần đăng ký trở thành chủ sở hữu để có thể đăng khách sạn.</div>
            <button
              onClick={() => setIsPopupVisible(true)}
              className='bg-primary rounded-md text-white p-2 mt-2 hover:bg-primary/90'
            >
              Đăng Ký Ngay
            </button>
          </>
        ) : (
          <>
            <div className='alert alert-warning'>
              Hồ sơ của bạn đang được chờ duyệt, vui lòng chờ để chúng tôi kiểm tra thông tin của bạn.
            </div>
          </>
        ))}

      {isPopupVisible && userRole !== 'owner' && (
        <OwnerUploadCV
          handleFileChange={handleFileChange}
          handleSubmit={handleSubmit}
          setIsPopupVisible={setIsPopupVisible}
          isLoading={isPending}
        />
      )}
    </div>
  )
}
