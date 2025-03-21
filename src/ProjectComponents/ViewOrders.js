import axios from "axios";
import { useEffect, useState } from "react"
import { Link, useNavigate} from "react-router-dom"
import { toast } from "react-toastify";
import './Home.css';
function ViewOrders() {
    const [ordersdata,setordersdata]=useState([]);
    const navigate = useNavigate();

    useEffect(()=>
        {
            if(sessionStorage.getItem("userdata")===null)
            {
                toast.warn("Please login to access the page");
                navigate("/login");
            }
            else
            {   
                var uinfo =JSON.parse(sessionStorage.getItem("userdata"));
                if(uinfo.usertype!=="admin")
                {
                    toast.warn("Please login to access the page");
                    navigate("/login");
                }
            }
        },[])
    async function fetchorders()
    {
        try
        {
            const resp =  await axios.get("http://localhost:9000/api/getallorders")
            if(resp.status===200)
            {
                if(resp.data.statuscode===1)
                {
                    setordersdata(resp.data.ordersdata)
                }
                else
                {
                    setordersdata([]);
                }
            }
            else
            {
                alert("Some error occured")
            }
        }
        catch(err)
        {
            alert(err.message);
        }
    }
    useEffect(()=>
    {
        fetchorders();
    },[])

    async function updatestatus(id)
    {
        navigate("/updatestatus?oid=" + id)
    }
    return (
        <>
            
                <div className="container">
                    
                    {
                        ordersdata.length>0?
                        <>
                            <h2>List of Orders</h2><br/>
                            <table className="user-table">
                                <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>State</th>
                                        <th>City</th>
                                        <th>Pincode</th>
                                        <th>Area</th>
                                        <th>Bill Amount</th>
                                        <th>Email</th>
                                        <th>Date</th>
                                        <th>Payment Mode</th>
                                        <th>Status</th>
                                        <th>Update Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                            {
                                ordersdata.map((item,index)=>
                                <tr key={index}>
                                    <td><Link to={`/orderitems?oid=${item._id}`}>{item._id}</Link></td>
                                    <td>{item.state}</td>
                                    <td>{item.city}</td>
                                    <td>{item.pincode}</td>
                                    <td>{item.area}</td>
                                    <td>{item.billamt}</td>
                                    <td>{item.email}</td>
                                    <td>{item.OrderDate}</td>
                                    <td>{item.PayMode}</td>
                                    <td>{item.status}</td>
                                    <td><button className="btn btn-primary"onClick={()=>updatestatus(item._id)}>Update</button></td>
                                </tr>
                                )
                            }
                             </tbody>
                            </table><br/>
                            <p className="record-count"> {ordersdata.length} orders found</p>
                        </>:<h2>No orders found</h2>
                    }
                </div>
            
        </>
    )
}
export default ViewOrders