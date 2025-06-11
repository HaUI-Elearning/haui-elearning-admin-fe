import { Outlet } from "react-router-dom";
import HeaderTeacher from "./Header/HeaderTeacher"
import Footer from "./Footer/Footer"

const MainLayoutTeacher = () => {
    return (
      <div className='main-layout'>
        <div className='layout-content'>
          <div className='outlet'>
            <div>
              <HeaderTeacher />
              <Outlet />
              <Footer/>
            </div>
          </div>
        </div>
      </div>
    )
  }
  export default MainLayoutTeacher