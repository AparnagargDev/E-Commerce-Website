import Header from './ProjectComponents/Header';
import AdminHeader from './ProjectComponents/AdminHeader';
import Footer from './ProjectComponents/Footer';
import SiteRoutes from './ProjectComponents/SiteRoutes';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createContext, useEffect, useState } from 'react';

const userContext = createContext(null);
function App() {
  const [udata,setudata] = useState(null);
  useEffect(()=>{
   if(sessionStorage.getItem("userdata")!==null)
   {
      setudata(JSON.parse(sessionStorage.getItem("userdata")))
   }
  },[])
  
  return (
    <>
    <userContext.Provider value={{udata,setudata}}>
      {
        udata===null?<Header/>:
        udata.usertype==="admin"?<AdminHeader/>:
        <Header/>
      }
    <br/>
    <SiteRoutes/><br/>
    <Footer/>
    
    </userContext.Provider>
    <ToastContainer theme="colored" />
    
    </>
      
    
  );
}

export default App;
export {userContext};
