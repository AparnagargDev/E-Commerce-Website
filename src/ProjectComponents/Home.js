import './Home.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

const divStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundSize: 'cover',
  height: '500px'
};

const slideImages = [
  { url: 'images/img5.jpg' },
  { url: 'images/img6.jpg' },
  { url: 'images/img7.jpg' }
];

function Home() {
    const [prodsdata, setprodsdata] = useState([]);

    async function fetchlatestprods() {
        try {
            const resp = await axios.get(`http://localhost:9000/api/fetchnewprods`);
            if (resp.status === 200) {
                if (resp.data.statuscode === 1) {
                    setprodsdata(resp.data.proddata);
                } else {
                    setprodsdata([]);
                }
            } else {
                alert("Some error occurred");
            }
        } catch (err) {
            alert(err.message);
        }
    }

    useEffect(() => {  
        fetchlatestprods();
    }, []);

    return (
        <>
            <div className="slide-container">
                <Slide>
                    {slideImages.map((slideImage, index) => (
                        <div key={index}>
                            <div style={{ ...divStyle, backgroundImage: `url(${slideImage.url})` }}>
                            </div>
                        </div>
                    ))} 
                </Slide>
            </div>
            <h1 className="latest-arrivals">Latest Arrivals</h1>
            <div className="arriv">
                <div className="container">
                    <div className="arriv-top">
                      {prodsdata.length > 0 ? (
                            prodsdata.map((item, index) => (
                                <div className="arriv-left" key={index}>
                                    <Link to={`/details?pid=${item._id}`}>
                                        <img title=" " alt=" " src={`uploads/${item.picture}`} height="200" width="400" />
                                    </Link>
                                    <p className="total-item p" style={{ color: 'black' }}>{item.pname}</p>
                                </div>
                            ))
                        ) : (
                            <h2>No Products Found</h2>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
