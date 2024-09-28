import React, { useEffect, useState, useContext } from 'react';
import '../CSS/Services.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setProductDetail } from '../Features/Slice'; 
import { Context } from './Context'; 

const Services = () => {
  const [products, setProducts] = useState([]);
  const { userId2 } = useParams(); 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { storeUserId, setStoreUserId } = useContext(Context); 

  useEffect(() => {
    setStoreUserId(userId2); 
  }, []);

  useEffect(() => {
    fetchUserProducts();
  }, [userId2]); 

  const fetchUserProducts = async () => {
    try {
      const response = await axios.get(`https://elexdondigitalacademy.com/api3/get_user_products.php?userId=${userId2}`);
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        console.error('Error fetching products');
      }
    } catch (error) {
      console.error('Error fetching products', error);
    }
  };

  const handleProductClick = (product) => {
    dispatch(setProductDetail(product)); 
    navigate(`/store/${userId2}/productdetail/${product.id}`); 
  };

  const [services,setServices]=useState([])
  useEffect(()=>{
    if(products){
      const filteredArray = products.filter((e)=>e.type==="service")
      setServices(filteredArray)
    }
  },[products])

  return (
    <div className='serviceBody'>
      <h2>SERVICES</h2>
      <section className='serviceWrap'>
        {services.length === 0 ? (
          <p>No service available.</p>
        ) : (
          services.map((product, index) => (
            <article key={index} className='serviceCon' onClick={() => handleProductClick(product)}>
              <div className='serviceImg'>
                <img
                  src={`https://elexdondigitalacademy.com/api3/uploads/${product.product_images[0]}`}
                  alt={product.product_name}
                />
              </div>
              <p>
                {product.product_name} <br />
                {product.description}
              </p>
              <h3>${product.price}</h3>
            </article>
          ))
        )}
      </section>
    </div>
  );
};

export default Services;
