import axios from "axios";
import { useContext, useEffect, useState } from "react"
import { Link, useNavigate} from "react-router-dom"
import { userContext } from "../App";
function ShowCart() 
{
    const [cartdata,setcartdata]=useState([]);
    const [billamt,setbillamt]=useState();
    const {udata} = useContext(userContext);
    const navigate = useNavigate();
    async function fetchcart()
    {
        try
        {
            const resp =  await axios.get(`http://localhost:9000/api/getcart?uemail=${udata.email}`)
            if(resp.status===200)
            {
                if(resp.data.statuscode===1)
                {
                    setcartdata(resp.data.cartinfo)
                    sessionStorage.setItem("cartdata",JSON.stringify(resp.data.cartinfo));
                }
                else
                {
                    setcartdata([]);
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
            fetchcart();
        }
    },[udata])

    useEffect(()=>
    {
        var gtotal=0;
        for(var x=0;x<cartdata.length;x++)
        {
            gtotal=gtotal+cartdata[x].TotalCost;
        }
        setbillamt(gtotal);
    },[cartdata])

    async function oncartdel(id)
    {
        var userresp=window.confirm("Are you sure to delete");
        if(userresp===true)
        {
            const resp =  await axios.delete(`http://localhost:9000/api/delcartitem/${id}`);
            if(resp.status===200)
            {
                if(resp.data.statuscode===1)
                {
                    alert("Item  removed from cart");
                    fetchcart();
                }
                else if(resp.data.statuscode===0)
                {
                    alert("Error while removing");
                }
            }
            else
            {
                alert("Some error occured")
            }
        }
    }
    function oncheckout()
    {
        sessionStorage.setItem("tbill",billamt);
        navigate("/checkout");
    }
    return(
        <>
        
         {
            cartdata.length>0?
            <>
            {/* <div className="container"></div> */}
            <table  border="1" align="center" width="1000">
                <tbody> 
                    <tr align="center" width="500" bgcolor="#ff6978">
                    <th>Picture</th>
                    <th>Name</th>
                    <th>Rate</th>
                    <th>Quantity</th>
                    <th>Total Cost</th>
                    <th>Delete</th>
                        
                    </tr>
                    </tbody>

                    {
                       cartdata.map((data,index)=>
                        <tr key={data}>
                            <td><img src={`uploads/${data.picture}`} height="50"  width="100"/></td>
                            <td>{data.ProdName}</td>
                            <td>{data.Rate}</td>
                            <td>{data.Qty}</td>
                            <td>{data.TotalCost}</td>
                            <td><button className="btn btn-danger" onClick={()=>oncartdel(data._id)}>Delete</button></td>

                        </tr>        
                       )

                    }        
                
            </table><br/>
            {cartdata.length} item(s) available in your cart<br/><br/>
            Rs.{billamt}/- is your total bill <br/><br/>
            <button name="btn" className="btn btn-primary" onClick={oncheckout}>Checkout</button>
            </>:<h2>No Product Found</h2>
        }
        

       
        </>
    )
}
export default ShowCart;