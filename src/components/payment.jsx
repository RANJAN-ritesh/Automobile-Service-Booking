import { useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router"
import "../styles/payment.css"
import { Navbar } from "./navbar"

export const PaymentPage = ()=>{
    let data = useSelector((state)=>state.cart)
    let [check1,setcheck1] = useState("")
    let [check2,setcheck2] = useState("")
    let navigate = useNavigate()
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
    
    function handleChange1(value){
        if(value == true){
            setcheck1("checked1")
        }else if(value == false){
            setcheck1("")
        }
    }
    function handleChange2(value){
        if(value == true){
            setcheck2("checked2")
        }else if(value == false){
            setcheck2("")
        }
    }
    function handleClick(){
        console.log("clicked")
        if(check1 == "checked1" && check2 == "checked2" ){
            alert("Please Select Only One Method of Payment")
        }else{
            if(check1 == "checked1"){
                console.log("go 1")
                sessionStorage.setItem("Booking","Offline Payment")
                alert("Offline Mode Selected")
                navigate("/summarypage")
                
            }else if(check2 == "checked2"){
                console.log("go 2")
                sessionStorage.setItem("Booking","Online Payment")
                alert("Online Mode Selected : You will be taken to Payment Gateway")
                navigate("/onlinePayment")
            }
        }
    }
    return(
        <div>
        <Navbar/>
            {
                <div className="PallData">
                <div className="ptop">
                    <div className="pimg">
                        <img src={data.img}/>
                    </div>
                    <div className="pdetails">
                    <div className="pname">
                        <p>{data.name}</p>
                    </div>
                    <div className="pamount">
                        <p>Amount to be Paid :</p>
                        <p>{data.Price} x {data.amount} </p>
                        <p>=</p>
                        <p>₹  {data.Price * data.amount} </p>
                        <p>=</p>
                        <p>₹ {fin}</p>
                        <p>( Amount to be Paid after Discount of {data.discount} )</p>
                        
                    </div>
                    </div>
                    
                </div>
                <div className="paymentParent">
                        <div>
                            <div className="PaymentHeading">
                                <p>Select a Payment Method</p>
                            </div>
                            <div className="inputDivs">
                            <input type="checkbox" className="checkboxs" onChange={(e)=>handleChange1(e.target.checked)}/>
                                <p>Pay in Cash</p>
                            </div>
                            <div className="inputDivs">
                            <input type="checkbox" className="checkboxs"  onChange={(e)=>handleChange2(e.target.checked)}/>
                                <p>Pay Online</p>
                            </div>
                            <button className="paymentBtn" onClick={handleClick}>CheckOut</button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}