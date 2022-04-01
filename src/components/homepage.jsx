import { useState } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router"
import { findLocation } from "../redux/action"
import "../styles/homepage.css"
import { Navbar } from "./navbar"

export const Homepage = ()=>{
    let [select,setSelect] = useState("")
    let dispatch = useDispatch()
    let data = useSelector((state)=>state.allData)
    let navigate = useNavigate()
    // console.log("data",data)
   
    function handleClick(){
        localStorage.removeItem('location')
        if(select != ""){
            const location = findLocation(select)
            dispatch(location)
           navigate("/a")
        }
     
    }
    return(
        <div className="parent">
       <Navbar/>
       <div >
        <div className="parentMain1">
        <div className="parentMain2">
            <div className="delhi">
              <p>DELHI</p>
            </div>
           
            <div>
                            <select name="locations" className="locationSelect" id="location" onChange={(e)=>{
                    const selected = e.target.value
                    setSelect(selected)
                    
                }}>
                  <option >Choose Your Location</option>
                  <option value="New Delhi">New Delhi</option>
                  <option value="Central Delhi">Central Delhi</option>
                  <option value="North Delhi">North Delhi</option>
                  <option value="South Delhi">South Delhi</option>
                  <option value="East Delhi">East Delhi</option>
                  <option value="West Delhi">West Delhi</option>
                </select>
            </div>
            </div>
            <div>
                <button className="btnHome" onClick={handleClick}>Search for Shops</button>
            </div>
        </div>
        </div>
        </div>
    )
}