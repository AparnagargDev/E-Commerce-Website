
import Home from './Home';
import Register from './Register';
import Login from './Login';
import SearchUser from './SearchUser';
import ListofUsers from './ListofUsers';
import ManageCategory from './ManageCategory';
import ManageProducts from './ManageProducts';
import ChangePassword from './ChangePassword';
import Categories from './Categories';
import Products from './Products';
import Details from './Details';
import ShowCart from './ShowCart';
import Checkout from './Checkout';
import OrderSummary from './OrderSummary';
import ViewOrders from './ViewOrders';
import UpdateStatus from './UpdateStatus';
import OrderItems from './OrderItems';
import OrderHistory from './OrderHistory';
import SearchProducts from './SearchProducts';
import { Route, Routes } from 'react-router-dom';
import TermsandConditions from './TermsandCondition';
import Contact from './Contact';



function SiteRoutes()
{
   
    return(
        <>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/homepage" element={<Home />} />
            <Route path="/Register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/searchuser" element={<SearchUser/>}/>
            <Route path="/*" elements={<h1>Page not found</h1>}/>
            <Route path= "/listofusers" element={<ListofUsers/>}/>
            <Route path= "/addcategory" element={<ManageCategory/>}/>
            <Route path= "/addproduct" element={<ManageProducts/>}/>
            <Route path= "/changepassword" element={<ChangePassword/>}/>
            <Route path= "/categories" element={<Categories/>}/>
            <Route path= "/products" element={<Products/>}/>
            <Route path= "/details" element={<Details/>}/>
            <Route path= "/showcart" element={<ShowCart/>}/>
            <Route path= "/checkout" element={<Checkout/>}/>
            <Route path= "/ordersummary" element={<OrderSummary/>}/>
            <Route path= "/vieworders" element={<ViewOrders/>}/>
            <Route path= "/orderitems" element={<OrderItems/>}/>
            <Route path= "/updatestatus" element={<UpdateStatus/>}/>
            <Route path= "/orderhistory" element={<OrderHistory/>}/>
            <Route path= "/searchresults" element={<SearchProducts/>}/>
            <Route path= "/terms" element={<TermsandConditions/>}/>
            <Route path= "/contactus" element={<Contact/>}/>
            
        </Routes>
        </>
    )
}
export default SiteRoutes;