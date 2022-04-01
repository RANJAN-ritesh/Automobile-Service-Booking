import { useState } from "react"
import { useNavigate } from "react-router"
import "../styles/onlinePayment.css"
import { Navbar } from "./navbar"
export const OnlinePayment = ()=>{
    // let data = useSelector((state)=>state.cart)
    let [name,setname] = useState("")
    let [numb,setnumb] = useState("")
    let [cvv, setcvv] = useState("")
    let navigate = useNavigate()

   function handleChange1(value){
       setname(value)
   }
   function handleChange2(value){
    setnumb(value)
}
function handleChange3(value){
    setcvv(value)
}
function handleClick(){
    console.log(name.length,numb.length,cvv.length)
    if(name != "" && numb != "" && cvv != ""){
       let count = 0
       if(numb.length == 3){
           count++
       }else{
           alert("Please Fill a 3-digit CVV Number")
       }
       if(cvv.length == 16){
           count++
       }else{
           alert("Please Fill a 16-digit Card Number")
       }
       if(count ==  2){
           alert("Payment Successful")
           navigate("/summarypage")
       }
    }else{
        alert("Please Fill all The Inputs")
    }
}
    console.log("online payment")
  return(
      <div>
      <Navbar/>
      <div className="ParentContainer"> 
    
         {
            <div className="container">
                <h1>PAYMENT CONFIRMATION</h1>
                 <div className="first-row">
            <div className="owner">
                <h3>Name On Card</h3>
                <div className="input-field">
                    <input type="text" id="owner" value={name} onChange={(e)=>handleChange1(e.target.value)}/>
                </div>
            </div>
            <div className="cvv">
                <h3>CVV</h3>
                <div className="input-field">
                    <input type="text" id="cvv" value={numb} onChange={(e)=>handleChange2(e.target.value)}/>
                </div>
            </div>
        </div>
        <div className="second-row">
            <div className="card-number">
                <h3>Card Number</h3>
                <div className="input-field">
                    <input type="text" id="cardnum" value={cvv} onChange={(e)=>handleChange3(e.target.value)}/>
                </div>
            </div>
        </div>
        <div className="third-row">
            <h3>Card Expiry</h3>
            <div className="selection">
                <div className="date">
                    <select name="months" id="months" required>
                        <option value="Jan">Jan</option>
                        <option value="Feb">Feb</option>
                        <option value="Mar">Mar</option>
                        <option value="Apr">Apr</option>
                        <option value="May">May</option>
                        <option value="Jun">Jun</option>
                        <option value="Jul">Jul</option>
                        <option value="Aug">Aug</option>
                        <option value="Sep">Sep</option>
                        <option value="Oct">Oct</option>
                        <option value="Nov">Nov</option>
                        <option value="Dec">Dec</option>
                      </select>
                      <select name="years" id="years">
                        <option value="2022">2022</option>
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                        <option value="2025">2025</option>
                        <option value="2026">2026</option>
                        <option value="2027">2027</option>
                        <option value="2028">2028</option>
                        <option value="2029">2029</option>
                      </select>
                </div>
                <div className="cards">
                    <img src="https://www.logolynx.com/images/logolynx/38/38b8f2f2c2917b4118a8d0fc3ba1ed31.png" className="bord" />
                    <img src=" http://cdn.onlinewebfonts.com/svg/download_436832.png"  />
                    <img src="http://pngimg.com/uploads/visa/visa_PNG10.png  "  className="bord"/>
                </div>
            </div>    
        </div>
        <button id="confirmbtn" onClick={handleClick} >CONFIRM</button>
    </div>
         }
      </div>
      </div>
  )
}