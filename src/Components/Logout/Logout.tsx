import { auth } from '../../../firebase/FirebaseConfig'

const Logout = () => {
  const handleLogout = async () => {
    try {
      await auth.signOut()
      window.location.href = '/login'
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <button
      onClick={handleLogout}
      className='text-left w-full  text-black hover:bg-primary hover:text-white p-2 rounded'
    >
      Đăng xuất
    </button>
  )
}

export default Logout
