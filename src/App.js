
import './App.css';
import {axios} from 'axios'

import { addData } from './redux/action';
import {ShowData} from '../src/components/showData'
import { useDispatch } from 'react-redux';
import { Homepage } from './components/homepage';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { IndividualData } from './components/individualData';
import { CartPage, PaymentPage } from './components/payment';
import { OnlinePayment } from './components/onlinePayment';
import { SummaryPage } from './components/summary';
import { Navbar } from './components/navbar';

function App() {
  let dispatch = useDispatch()
 
 useEffect(() => {
  function getdata(){
    fetch("https://automobilerepairapi.herokuapp.com/vehicle_shops")
    .then((res)=>res.json())
    .then((resp)=>{
      console.log(resp)
      dispatch(addData(resp))
     })
   }
  getdata()
},[]);
  return (
    <div className="App" >
     {/* <Homepage/>
     <ShowData/> */}
 
     <Routes>
       <Route path={"/"} element={<Homepage/>}></Route>
       <Route path={"/a"} element={<ShowData/>}></Route>
       <Route path={"/shoppage"} element={<IndividualData/>} ></Route>
       <Route path={"/Paymentpage"} element={<PaymentPage/>}></Route>
       <Route path={"/onlinePayment"} element={<OnlinePayment/>} ></Route>
       <Route path={"/summarypage"} element={<SummaryPage/>} ></Route>
     </Routes>
    </div>
  );
}

export default App;
