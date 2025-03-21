import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

function Products() 
{
    const [params] = useSearchParams();
    const catid = params.get("cat");
    const [prodsdata,setprodsdata]=useState([]);
    useEffect(()=>
    {
        if(catid!=="")
        {
            fetchprodsbycat();
        }
    },[catid])
    
    async function fetchprodsbycat()
    {
        try
        {
            const resp =  await axios.get(`http://localhost:9000/api/fetchprodsbycatid?cid=${catid}`)
            if(resp.status===200)
            {
                if(resp.data.statuscode===1)
                {
                    setprodsdata(resp.data.proddata)
                }
                else
                {
                    setprodsdata([]);
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
    return(
<>
        
    <div className="arriv">
	  <div className="container">
        <div class="arriv-top">
        {
            prodsdata.length>0?
            prodsdata.map((item, index) =>
                <div className="col-md-6 arriv-left" key={index}>
				<Link to={`/details?pid=${item._id}`}>
                <img title=" " alt=" " src={`uploads/${item.picture}`}  height="400" />
                </Link>
                
                <p className="total-item p" style={{ color: 'black' }}>{item.pname}</p>
                </div>
            ):<h2>No Products found</h2>
                    
        }
		    </div>
        </div>
    </div>
 </>
    
    )
}
export default Products;