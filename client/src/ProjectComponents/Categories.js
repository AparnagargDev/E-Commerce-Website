import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function Categories()
{
    const [catdata, setcatdata] = useState([]);
    async function fetchallcat() {
        try {
            const resp = await axios.get("http://localhost:9000/api/getallcat")
            if (resp.status === 200) {
                if (resp.data.statuscode === 1) {
                    setcatdata(resp.data.catdata)
                }
                else {
                    setcatdata([]);
                }
            }
            else {
                alert("Some error occured")
            }
        }
        catch (err) {
            alert(err.message);
        }
    }
    useEffect(() => {
        fetchallcat();
    }, [])
    return(
<>
        
    <div className="arriv">
	  <div className="container">
        <div class="arriv-top">
        {
            catdata.map((item, index) =>
                <div className="col-md-6 arriv-left" key={index}>
				<Link to={`/products?cat=${item._id}`}>
                <img title=" " alt=" " src={`uploads/${item.catpic}`}  height="400" />
                </Link>
                
                <p className="total-item p" style={{ color: 'black' }}>{item.catname}</p>
                </div>
                    
                )}
		    </div>
        </div>
    </div>
</>
    
    )
}
export default Categories;