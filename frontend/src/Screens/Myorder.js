

import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {
  const [orderData, setOrderData] = useState([]);

  const fetchMyOrder = async () => {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
      return;
    }    
    try {
      const res = await fetch('https://food-app-j8ho.onrender.com/api/auth/myOrderData', {
        credentials: 'include',
        Origin: '/login',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userEmail,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to fetch order data');
      }

      const response = await res.json();
      setOrderData(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>

      <div className='container'>
        <div className='row'>
          {orderData.length > 0 ? (
            orderData.map((data, index) => (
              <div key={index}>
                {data.orderData ? (
                  data.orderData.order_data
                    .slice(0)
                    .reverse()
                    .map((item, itemIndex) => (
                      <div key={itemIndex}>
                        {item.Order_date ? (
                          <div className='m-auto mt-5'>
                            {data = item.Order_date}
                            <hr />
                          </div>
                        ) : (
                          <div className='col-12 col-md-6 col-lg-3'>
                            <div className='card mt-3' style={{ width: '16rem', maxHeight: '360px' }}>
                              <img src={item.img} className='card-img-top' alt='...' style={{ height: '120px', objectFit: 'fill' }} />
                              <div className='card-body'>
                                <h5 className='card-title'>{item.name}</h5>
                                <div className='container w-100 p-0' style={{ height: '38px' }}>
                                  <span className='m-1'>{item.qty}</span>
                                  <span className='m-1'>{item.size}</span>
                                  <span className='m-1'>{data}</span>
                                  <div className='d-inline ms-2 h-100 w-20 fs-5'>₹{item.price}/-</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))
                ) : (
                  ''
                )}
              </div>
            ))
          ) : (
            <div className='p-2 text-bold m-5'>No order data available.</div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
