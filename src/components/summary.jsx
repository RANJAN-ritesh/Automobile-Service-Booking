import { useSelector } from "react-redux"
import { useNavigate } from "react-router"
import "../styles/summary.css"
import { Navbar } from "./navbar"

export const SummaryPage = ()=>{
    let navigate = useNavigate()
    console.log("summary page")
    let data = useSelector((state)=>state.cart)
    let book = sessionStorage.getItem("Booking")
    console.log(book)
    console.log(data)
    let str = data.discount
    let nstr = str[0]+str[1]
    nstr = +nstr
    console.log(nstr + "i ma nastr")
    let fin;
    if(str === "N/A"){
        fin = data.Price*data.amount
    }else{
        let discountPrice = Math.floor( (data.Price*data.amount*nstr)/100)
        fin = Math.floor((data.Price*data.amount) - discountPrice)
         
    }
    return(
        <div>
        <Navbar/>
        <div className="BookingParent">
        <div className="cnf1">
          <h1>BOOKING CONFIRMED !!</h1>
        </div>
        <div className="cnf2">
          <h2>BOOKING SUMMARY </h2>
        </div>
           <div className="parentDIv">
               <div>
                <img src={data.img} />
                <div className="shopname"><p>{data.name}</p></div>
                <div className="shopadd"><p>{data.address}</p></div>
               </div>
               <div className="FdetailsDiv">
                
                 <div className="finDivs">
                     <p>Amount {book == "Online Payment" ? "Paid" : "to be Paid"  } :</p>
                     <p>₹  {fin}</p>
                 </div>
                 <div className="finDivs">
                     <p>Payment Mode :</p>
                     <p>{book}</p>
                  
                 </div>
                 <div className="finDivs">
                     <p>Alloted Time :</p>
                     <p>{data.time}</p>
                 </div>
                 <div className="finDivs">
                     <p>Alloted Date :</p>
                     <p>{data.date}</p>
                 </div>
                 <div className="finDivs">
                     <p>Booked On :</p>
                     <p>{data.cdate}</p>
                 </div>
                 
               </div>
           </div>
           <div className="finBtn">
               <button onClick={()=>navigate("/")} >Go To Homepage</button>
           </div>
        </div>
        </div>
    )
}