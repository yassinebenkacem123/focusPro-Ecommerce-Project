import { Outlet } from 'react-router-dom'
import NavBar from '../components/header/NavBar'
import Footer from '../components/sections/footer/Footer'
import { useLocation } from 'react-router-dom'
const Layout = () => {
  const location = useLocation();
  return (
    <div className='flex flex-col overflow-x-hidden bg-color'>
          {location.pathname !== '/auth' &&
            <NavBar/>}
          <Outlet />
      {location.pathname !== '/auth' && 
        <Footer />}
    </div>
  )
}

export default Layout