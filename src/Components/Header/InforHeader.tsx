import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { Popover } from 'antd'
import { auth, db } from '../../../firebase/FirebaseConfig'
import { Link } from 'react-router-dom'

import { MenuOutlined, UserOutlined } from '@ant-design/icons'
import Logout from '../Logout'
import { TypeInfor } from '../../Types/Users.type'
import { doc, onSnapshot } from 'firebase/firestore'

const InforHeader = () => {
  const [user, setUser] = useState<TypeInfor | null>(null)

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const docRef = doc(db, 'Users', currentUser.uid)

          const unsubscribeSnapshot = onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists()) {
              setUser(docSnap.data() as TypeInfor)
            } else {
              console.error('No such document!')
              setUser(null)
            }
          })

          return () => unsubscribeSnapshot()
        } catch (error) {
          console.error('Error fetching user data from Firestore:', error)
          setUser(null)
        }
      } else {
        setUser(null)
      }
    })

    return () => unsubscribeAuth()
  }, [])
  // popover
  const content = (
    <div className='w-[200px]  bg-white    '>
      {!user ? (
        <>
          <h3 className='text-lg font-semibold mb-2'>Chào mừng bạn!</h3>
          <Link to='/login' className='block text-black hover:bg-primary hover:text-white mb-2 p-2 rounded'>
            Đăng nhập
          </Link>
          <Link to='/register' className='block text-black hover:bg-primary hover:text-white p-2 rounded'>
            Đăng ký
          </Link>
        </>
      ) : (
        <div className='w-[200px]'>
          <h3 className='text-lg font-semibold mb-2 '>Xin chào, {user.displayName}!</h3>

          <Link to='/profile' className='block  text-black hover:bg-primary hover:text-white p-2 rounded'>
            Thông tin cá nhân
          </Link>
          <Logout />
        </div>
      )}
    </div>
  )
  return (
    <div className='flex items-center gap-4 cursor-pointer'>
      <div className='text-[16px] font-medium text-black hover:bg-grey1 rounded-full p-3 transition duration-300 ease-in-out'>
        Cho thuê chỗ ở qua Airbnb
      </div>
      <Popover content={content} trigger='click' className='hover:shadow-xl '>
        <div className='flex items-center p-2 border border-gray-300 rounded-full hover:bg-gray-100 transition duration-300 ease-in-out '>
          {user ? (
            <>
              {user.photoURL && <img src={user.photoURL} className='w-[30px] h-[30px] rounded-full'></img>}
              <span className='text-black px-1'>{user.displayName}</span>
            </>
          ) : (
            <div className='flex items-center w-16 justify-center py-1'>
              <MenuOutlined className='text-black text-[16px] ' />
              <UserOutlined className='text-black ml-2 text-[16px]' />
            </div>
          )}
        </div>
      </Popover>
    </div>
  )
}

export default InforHeader
