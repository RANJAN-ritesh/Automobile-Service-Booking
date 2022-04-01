import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { addCart, addData } from "../redux/action"
import "../styles/IndividualData.css"
import { Navbar } from "./navbar"

export const IndividualData = ()=>{
    let setting = useSelector((state)=>state.shopid)
    let [amount,setAmount] = useState(0)
    let [time,setTime] = useState("")
    let [date,setDate] = useState("")
    let dispatch = useDispatch()
    let navigate = useNavigate()
    // console.log(time,date,amount)
    // console.log(setting)
    let checkId = JSON.parse(localStorage.getItem('shopid'))
    let [obj, setObj] = useState({})

    if(checkId){

    }else{
        
        localStorage.setItem("shopid",JSON.stringify(setting))
    }
    useEffect(() => {
        function getdata(){
          fetch("https://automobilerepairapi.herokuapp.com/vehicle_shops")
          .then((res)=>res.json())
          .then((resp)=>{
            console.log(resp)
            
           resp.map((e)=>{
               if(e.id === checkId){
                 setObj(e)
               }
           })
        
           })
         }
        getdata()
        
      },[]);
    //   console.log("obj",obj)

      function handleInputChange(no){
          setAmount(no)
      }
      function handleIclick(){
          
var today = new Date();
var Tdate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var Ttime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
          const payload = {
              "date":date,
              "amount":amount,
              "time":time,
              "ctime":Ttime,
              "cdate":Tdate,
              "id":checkId,
              "img":obj.img,
              "name":obj.name,
              "Price":obj.services,
              "discount":obj.Discount,
              "address":obj.address
          }
          let dateCheck1 = Tdate.split("-").map(Number)
          let dateCheck2 = date.split("-").map(Number)
          console.log(dateCheck1)
          console.log(dateCheck2)
        let count = 0;
        if(dateCheck1[0]<=dateCheck2[0]){
            count++
        }
        if(dateCheck1[1]<=dateCheck2[1]){
            count++
        }
        if(dateCheck1[1] === dateCheck2[1]){
            if(dateCheck1[2] < dateCheck2[2]){
                count++
            }
           
        }
        console.log(count)
          if(payload.date != "" &&   payload.time != "" && payload.amount>0){
              if(count === 3){
                dispatch(addCart(payload))
                alert('Bookings Confirmed - You will be taken to payment page')
               navigate('/Paymentpage')
              }else{
                  alert("Please fill the Date after today")
              }
            
          }else{
              alert("Please Check If Date , Time and Amount are Filled")
          }
       
      }
    return(
        <div>
         <Navbar/>
        <div className="IndParent">
            {
              <div className="IndProd">
                  <div className="IimgDiv">
                     <div>
                     <img src={obj.img}/>
                     </div>
                      
                      <div className="IratingDiv">
                       <p>Rating :</p>
                       <p>{obj.Rating} </p>
                       <p> / 5</p>
                       <img src="https://img.icons8.com/ios-glyphs/30/000000/star--v1.png"/>
                      </div>
                      <div className="ItimeDiv">
                          <p>Timings :</p>
                          <p>{obj.timings}</p>
                      </div>
                      <div className="IcontactDiv">
                          <p>Contact :</p>
                          <p>{obj.contact}</p>
                      </div>
                      <div className="IlocationDiv">
                          <p>Location :</p>
                          <p>{obj.location}</p>
                          <p>, DELHI</p>
                      </div>
                  </div>
                  <div className="IdetailsDiv">
                     <div className="InameDiv"> <p>{obj.name}</p></div>
                     <div className="IaddressDiv">
                         <p>{obj.address}</p>
                     </div>
                     <div className="IdiscountDiv">
                        <p>Discounts :</p>
                        <p>{obj.Discount}</p>
                        <p>Off</p>
                     </div>
                     <div className="IpriceDiv">
                         <p>Service Price :</p>
                         <p>₹ {obj.services}</p>
                     </div>
                     <div className="Iamount">
                        <p>No. of Vehicles :</p>
                         <button onClick={()=>{if(amount<6){setAmount(amount+1)}else{alert("No More Than 6 Vehicles Allowed")}}}>+</button>
                         <input type="Number" value={amount} onChange={(e)=>handleInputChange(e.target.value)}/>
                         <button onClick={()=>{if(amount>0){setAmount(amount-1)}}}>-</button>
                     </div>
                     <div className="Timings">
                         <p>Select Time :</p>
                         <input type="time" min="07:00:00" max="22:00:00" onChange={(e)=>setTime(e.target.value)}/>
                         <p>Select Date :</p>
                         <input type="date" onChange={(e)=>setDate(e.target.value)}/>

                     </div>
                     <div className="bookingButt">
                         <button onClick={handleIclick}>PROCEED TO PAY</button>
                         {/* <button onClick={()=>{ navigate("/cartpage")}}>GO TO CART</button> */}
                     </div>
                  </div>
              </div>
            }
        </div>
        </div>
    )
}