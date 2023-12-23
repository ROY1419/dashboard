
import Login from './components/Login';
import Register from './components/Register';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import app_config from './config';
import Tabsrow from './components/Tabsrow';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './components/Header';

function App() {

  const url = app_config.backend_url
  const [mainData, setMainData] = useState([]);
  //asynchronous function to fetch data from server and updating the state
  const getDataFromDB = async () => {
    try {
      const response = await axios.get(url + "/data/all");
      setMainData(response.data.data)
    }
    catch (e) {
      console.log(e)
    }
  }
  //calling the above function on first render
  useEffect(() => {
    getDataFromDB();
  }, [])
  //where a state is updated, we will print the length of data received just for the test purposes
  useEffect(() => {
    console.log(mainData.length)
  }, [mainData])


  return (
    <div style={{ marginTop: '-3.5rem' }}>

      <BrowserRouter >
        {/* <Header /> */}
        {/* <Tabsrow data={mainData} setMainData={setMainData} /> */}
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/home" element ={<Home/>} /> */}
          <Route path='/tabsrow' element={< Tabsrow />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App