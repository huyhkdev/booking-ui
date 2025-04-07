import { useNavigate } from 'react-router-dom';
import { useLogout } from '../../hooks/auth/useUserInfo'

const Logout = () => {
  const logout = useLogout();
  const navivate = useNavigate();
  const handleLogout = async () => {
    logout();
    navivate('/login');
    window.location.reload();
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
