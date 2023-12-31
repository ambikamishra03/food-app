// import React, { useEffect, useState } from 'react'
// import Footer from '../components/Footer';
// import Navbar from '../components/Navbar';

// export default function MyOrder() {

//     const [orderData, setorderData] = useState({})

//     const fetchMyOrder = async () => {
//         console.log(localStorage.getItem('userEmail'))
//         await fetch("http://localhost:5000/api/auth/myOrderData", {
//             credentials: 'include',
//             Origin:"http://localhost:3000/login",
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body:JSON.stringify({
//                 email:localStorage.getItem('userEmail')
//             })
//         }).then(async (res) => {
//             let response = await res.json()
//             await setorderData(response)
//         })



//         // await res.map((data)=>{
//         //    console.log(data)
//         // })


//     }

//     useEffect(() => {
//         fetchMyOrder()
//     }, [])

//     return (
//         <div>
//             <div>
//                 <Navbar />
//             </div>

//             <div className='container'>
//                 <div className='row'>

//                     {orderData !== {} ? Array(orderData).map(data => {
//                         return (
//                             data.orderData ?
//                                 data.orderData.order_data.slice(0).reverse().map((item) => {
//                                     return (
//                                         item.map((arrayData) => {
//                                             return (
//                                                 <div  >
//                                                     {arrayData.Order_date ? <div className='m-auto mt-5'>

//                                                         {data = arrayData.Order_date}
//                                                         <hr />
//                                                     </div> :

//                                                         <div className='col-12 col-md-6 col-lg-3' >
//                                                             <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
//                                                                 <img src={arrayData.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
//                                                                 <div className="card-body">
//                                                                     <h5 className="card-title">{arrayData.name}</h5>
//                                                                     <div className='container w-100 p-0' style={{ height: "38px" }}>
//                                                                         <span className='m-1'>{arrayData.qty}</span>
//                                                                         <span className='m-1'>{arrayData.size}</span>
//                                                                         <span className='m-1'>{data}</span>
//                                                                         <div className=' d-inline ms-2 h-100 w-20 fs-5' >
//                                                                             ₹{arrayData.price}/-
//                                                                         </div>
//                                                                     </div>
//                                                                 </div>
//                                                             </div>

//                                                         </div>



//                                                     }

//                                                 </div>
//                                             )
//                                         })

//                                     )
//                                 }) : ""
//                         )
//                     }) : ""}
//                 </div>


//             </div>

//             <Footer />
//         </div>
//     )
// }
// {"orderData":{"_id":"63024fd2be92d0469bd9e31a","email":"mohanDas@gmail.com","order_data":[[[{"id":"62ff20fbaed6a15f800125e9","name":"Chicken Fried Rice","qty":"4","size":"half","price":520},{"id":"62ff20fbaed6a15f800125ea","name":"Veg Fried Rice","qty":"4","size":"half","price":440}],"2022-08-21T15:31:30.239Z"],[[{"id":"62ff20fbaed6a15f800125f4","name":"Mix Veg Pizza","qty":"4","size":"medium","price":800},{"id":"62ff20fbaed6a15f800125f3","name":"Chicken Doub;e Cheeze Pizza","qty":"4","size":"regular","price":480}],"2022-08-21T15:32:38.861Z"]],"__v":0}}



import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {
  const [orderData, setOrderData] = useState([]);

  const fetchMyOrder = async () => {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
      return; // Return early if userEmail is not available
    }

    try {
      const res = await fetch('localhost:5000/api/auth/myOrderData', {
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
            <div>No order data available.</div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
