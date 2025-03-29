import { Outlet, useLocation, useNavigate, matchPath } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import PageTransition from './PageTransition';
import { Button } from 'antd';
// import StairEffect from './StairEffect'

const MainLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const listCanBack = ['/roomlist', '/hotelDetails'];
  const isBackablePath = listCanBack.some(path => 
    matchPath(path, location.pathname) || (path === '/hotelDetails' && location.pathname.startsWith('/hotelDetails/'))
  );
  
  return (
    <div>
      <Header />
      {isBackablePath &&  <div  className='p-4' onClick={() => navigate(-1)} ><Button>Trở về</Button></div>}
      <PageTransition>
        <Outlet />
      </PageTransition>
      {location.pathname !== '/roomlist' && <Footer />}   
    </div>
  );
}

export default MainLayout;
