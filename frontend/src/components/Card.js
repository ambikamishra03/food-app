import React, { useEffect,useRef,useState } from "react";
import { useNavigate } from 'react-router-dom'
import { useDispatchCart,useCart } from "./ContextReducer";

export default function Card(props) {

  let dispatch  = useDispatchCart();
  let data =useCart();
  const priceRef= useRef();
  let options=props.options;
  let priceOptions = Object.keys(options);
  const [qty,setQty] =  useState(1);
  const [size,setSize] =  useState("");

  // aadding data to cart
  const handleAddToCart = async() =>{
    let food =[]
    for(const item of data){
      if(item.data === props.foodItem._id){
        food = item;
        break;
      }
    }
    if(food !==[]){
      if(food.size === size){
        await dispatch({type:"UPDATE", id:props.foodItem._id, price:finalPrice,qty:qty})
        return
      }
    
    else if(food.size !== size){
    await dispatch({type:"ADD",id:props.foodItem._id,name:props.foodItem.name,price:finalPrice, qty:qty,size:size})
    return
    }
  return }
    await dispatch({type:"ADD",id:props.foodItem._id,name:props.foodItem.name,price:finalPrice, qty:qty,size:size})
    
    // console.log(data);
  }
  // calculating price
  let finalPrice =qty*parseInt(options[size]);
  useEffect(() => {
    setSize(priceRef.current.value)
  }, [])
  
  return (
    <div>
      <div>
        <div
          className="card mt-3"
          style={{ width: "18rem", maxHeight: "360px" }}
        >
          <img src={props.foodItem.img} className="card-img-top" alt="..."  style={{padding:"2px",height:"120px",objectFit:"fill"}}/>
          <div className="card-body">
            <h5 className="card-title">{props.foodItem.name}</h5>
            <div className="container w-100">
              <select className="m-2 h-100 bg-primary rounded" onChange={(e) =>setQty(e.target.value)}>
                {Array.from(Array(6), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}>
                      {" "}
                      {i + 1}{" "}
                    </option>
                  );
                })}
              </select>
              {/* for amount and size  */}
              <select className="m-2 h-100 bg-primary rounded"  ref={priceRef} onChange={(e) =>setSize(e.target.value)}>
              {priceOptions.map((data)=>{
                return <option key ={data} value ={data}>{data}</option>
              })}
              </select>
              <div className="d-inline h-50 fs-5">
              Rs.{finalPrice}/-
              </div>
            </div>
            <hr></hr>
            <button className="btn btn-primary justify-centre ms-2" onClick={handleAddToCart}>Add To Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}
