import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Navigate } from "react-router-dom"
import { individual } from "../redux/action"
import "../styles/showData.css"
import { Homepage } from "./homepage"
import { Navbar } from "./navbar"
import "../styles/navbar.css"

export const ShowData = ()=>{
    let [datas,setDatas] = useState([])
    let dispatch = useDispatch()
    let setting = useSelector((state)=>state.locationFilter[0])
    let check = JSON.parse(localStorage.getItem('location'))
    if(check){

    }else{
        
        localStorage.setItem("location",JSON.stringify(setting))
    }
    
  console.log(datas)

    useEffect(() => {
       
        function getdata(){
          fetch("https://automobilerepairapi.herokuapp.com/vehicle_shops")
          .then((res)=>res.json())
          .then((resp)=>{
            console.log(resp)
            let arr = []
           resp.map((e)=>{
               if(e.location === check){
                   arr.push(e)
               }
           })
           
            setDatas(arr)
           
           })
         }
      
            getdata()
         
      },[]);

      function HandleDivClick(id){
          console.log(id)
          localStorage.removeItem('shopid')
          dispatch(individual(id))
      }
      function handleSort(sort){
       
        console.log(sort) 
        if(sort == "sortRate"){
            function getdata(){
                fetch("https://automobilerepairapi.herokuapp.com/vehicle_shops")
                .then((res)=>res.json())
                .then((resp)=>{
                  console.log(resp)
                  let arr = []
                 resp.map((e)=>{
                     if(e.location === check){
                         arr.push(e)
                     }
                 })
                 const sortData =  arr.sort((a,b)=>{
                    return (b.Rating - a.Rating)
                })
                  setDatas(sortData)
                 
                 })
               }
            
                  getdata()
                  alert("Filter applied : Shops are Sorted by Ratings")
        }else if(sort == "sortPrice"){
            function getdata(){
                fetch("https://automobilerepairapi.herokuapp.com/vehicle_shops")
                .then((res)=>res.json())
                .then((resp)=>{
                  console.log(resp)
                  let arr = []
                 resp.map((e)=>{
                     if(e.location === check){
                         arr.push(e)
                     }
                 })
                 const sortData =  arr.sort((a,b)=>{
                    return (a.services - b.services)
                })
                  setDatas(sortData)
                 
                 })
               }
            
                  getdata()
                  alert("Filter applied : Shops are Sorted by Price")
        }else if(sort == "onlinePayment"){
            function getdata(){
                fetch("https://automobilerepairapi.herokuapp.com/vehicle_shops")
                .then((res)=>res.json())
                .then((resp)=>{
                  console.log(resp)
                  let arr = []
                 resp.map((e)=>{
                     if(e.location === check && e.OnlinePayments === true){
                         arr.push(e)
                     }
                 })
                 const sortData =  arr
                  setDatas(sortData)
                 
                 })
               }
            
                  getdata()
                  alert("Filter applied : Only Shops with Online Payment will be Seen")
        }
        
    }
     
    return(
        <div>
        <Navbar/>
        <div>
        
        <div>
       
        </div>
         
        <div className="allData1">
            
            <div>
            <select onChange={(e)=>{
                const sort = e.target.value
                console.log(sort)
                handleSort(sort)
            }} className="sortingSelect">
                <option >Sort the Shops</option>
                <option value="sortRate">Sort By Ratings</option>
                <option value="sortPrice">Sort By Price</option>
                <option value="onlinePayment" >Online Payment Available</option>
            </select>
            </div>
            
        </div>
        <div className="allData2">
            {
              datas.map((element)=>{
                 return(
                    <div className="mapParent" onClick={()=>{HandleDivClick(element.id) }}>
                      <div className="imgDiv">
                          <img src={element.img}/>
                      </div>
                      <div className="detailsDiv">
                      <div className="nameDiv">
                          <p><Link to="/shoppage" className="linkDecoration" id="linkDec_name">{element.name}</Link></p>
                         
                      </div>
                      <div className="addressDiv">
                          <p><Link to="/shoppage" className="linkDecoration" id="linkDec_add">{element.address}</Link></p>
                      </div>
                      <div className="timingsDiv">
                         <div>
                          <p><Link to="/shoppage" className="linkDecoration" id="linkDec_time1">Timing : </Link></p>
                          <p><Link to="/shoppage" className="linkDecoration" id="linkDec_time2" >{element.timings}</Link></p>
                          </div>
                          <div className="priceDiv">
                          <p><Link to="/shoppage" className="linkDecoration" id="priceDec1">Price :</Link></p>
                          <p><Link to="/shoppage" className="linkDecoration" id="priceDec2">₹ {element.services}</Link></p>
                      </div>
                          <div className="offersDiv">
                              <p><Link to="/shoppage" className="linkDecoration" id="offerDec1">Offers :</Link></p>
                              <p><Link to="/shoppage" className="linkDecoration" id="offerDec2">{element.Discount}  Off</Link></p>
                          </div>
                          <div className="ratingDiv">
                              <p><Link to="/shoppage" className="linkDecoration" id="rateDec1">Rating :</Link></p>
                              <p><Link to="/shoppage" className="linkDecoration" id="rateDec2">{element.Rating}</Link></p>
                          </div>
                      </div>

                      </div>
                  </div>
                 )
              })
            }
            </div>
        </div>
        </div>
    )
}