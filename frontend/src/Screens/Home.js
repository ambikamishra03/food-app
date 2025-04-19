import React, {useEffect,useState} from 'react'
import Card from '../components/Card' 
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'


export default function Home() {
  
  const [search,setSearch] = useState('');
  const [foodItem,setfoodItem] = useState([]);
  const [foodCat,setfoodCat] = useState([]);

   const localData = async () =>{

    let response = await fetch("https://food-app-j8ho.onrender.com/api/foodData",{
      method:"POST",
      headers:{ 'Content-type' : 'application/json'}
    });
    response = await response.json();

    setfoodItem(response[0]);
    setfoodCat(response[1]);
    console.log(response[0],response[1]);
   }
useEffect(() => {
  localData()
}, [])





  return (
    <div>
      <div><Navbar /></div>
      <div>
        {/* carousal  */}
        <div
        id="carouselExampleAutoplaying"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner" id="carousel">
          <div className="carousel-caption" style={{ zIndex: "15" }}>
            <div className="d-flex justify-content-centre">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={search}
                onChange={(e)=>{setSearch(e.target.value)}}
              />
              {/* <button
                className="btn btn-outline-primary text-white bg-primary"
                type="submit"
              >
                Search
              </button> */}
            </div>
          </div>
          <div className="carousel-item active">
            <img
              src="https://media.istockphoto.com/id/1498243668/photo/tasty-cheeseburger-with-lettuce-cheddar-cheese-tomato-and-pickles-burger-bun-with-sesame.jpg?s=1024x1024&w=is&k=20&c=HQpNZF02_IhhTDQ_TBpZW6LWmDbk2PvN6M5_R55FwRY="
              className="d-block w-100"
              alt="..."
              style={{ filter: "brightness(30%)" }}
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://media.istockphoto.com/id/1287894191/photo/vertical-top-view-of-margherita-pizza-with-vegetables-and-herbs.jpg?s=1024x1024&w=is&k=20&c=7DPCFxRLOfOc4e8bB-NJ2ewYe_tw5-S5PUXky4xfq2w="
              className="d-block w-100"
              alt="..."
              style={{ filter: "brightness(30%)" }}
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="d-block w-100"
              alt="..."
              style={{ filter: "brightness(30%)" }}
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      </div>
     <div className='container'>
     {
      foodCat !==0
      ? foodCat.map((data)=>{
        return (<div className="row mb-3" >
        <div key={data._id} className="fs-3 m-3">
        {data.CategoryName}</div>
        <hr/>
        {foodItem !== 0? foodItem.filter ((item)=>((item.CategoryName === data.CategoryName) &&(item.name.toLowerCase()
        .includes(search.toLowerCase()))))
        .map(filterItems=>{
          return (
            <div key={filterItems._id} className="col-12 col-md-6 col-lg-3">
             <Card
              foodItem={filterItems}
             options={filterItems.options[0]}
             ></Card>
            </div>
          )
        })
        :<div>No such data found</div>
        }
        </div>
        )
      }):""
     }
     </div>
      <div><Footer /></div>
    </div>
  )
}
