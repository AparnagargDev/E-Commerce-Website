import './Home.css';
import axios from "axios";
import { useContext, useEffect, useState } from "react"
import { Link, useNavigate} from "react-router-dom"
import { userContext } from "../App";


function OrderHistory() {
    const [ordersdata,setordersdata]=useState([]);
    const navigate = useNavigate();
    const {udata} = useContext(userContext);
    async function fetchorders()
    {
        try
        {
            const resp =  await axios.get("http://localhost:9000/api/getuserorders?un=" + udata.email)
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
        if(udata!==null)
        {
            fetchorders();
        }
    },[udata])

    return (
        <>
         <div className="order-history-container">
            <div className="breadcrumbs">
                <div className="container">
                    <ol className="breadcrumb">
                        <li><Link to="/">Home</Link></li>
                        
                        <li className="active">List of Orders</li>
                    </ol>
                </div>
            </div>
            <div className="table-container">
            {
                        ordersdata.length>0?
                        <>
                            <h2 className="order-history-title">List of Orders</h2>
                            <table className="order-table" >
                                <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Address</th>
                                        <th>Bill Amount</th>
                                        <th>Email</th>
                                        <th>Date</th>
                                        <th>Payment Mode</th>
                                        <th>Status</th>
                                    </tr>
                                    </thead>
                                <tbody>
                            {
                                ordersdata.map((item,index)=>
                                <tr key={index}>
                                    <td><Link to={`/orderitems?oid=${item._id}`}>{item._id}</Link></td>
                                    <td>{item.city}</td>
                                    <td>{item.billamt}</td>
                                    <td>{item.email}</td>
                                    <td>{item.OrderDate}</td>
                                    <td>{item.PayMode}</td>
                                    <td>{item.status}</td>
                                </tr>
                                )
                            }
                            </tbody>
                            </table>
                            <p className="order-count">{ordersdata.length} orders found</p>
                        </>:<h2 className="no-orders">No orders found</h2>
                    }
                </div>
                </div>
        </>
    )
}
export default OrderHistory;