import { Link, useLocation } from 'react-router-dom'

import Nav from '../Nav'
import InforHeader from './InforHeader'
import Logo from './Logo'

const Header = () => {
  const location = useLocation()
  const { pathname } = location
  const hiddenPaths = ['/login', '/register', '/verify']
  const isHidden = hiddenPaths.includes(pathname)

  return (
    <header className='py-1 relative  xl:pt-2 px-5 xl:px-10  border-gray-200 border-b'>
      <div className='container mx-auto flex justify-between items-center h-[50px] '>
        {/* logo */}
        <Link to='/'>
          <Logo />
        </Link>
        {isHidden && <></>}
        {!isHidden && (
          <>
            {/* <Nav /> */}
            <InforHeader />
          </>
        )}
      </div>
    </header>
  )
}

export default Header
