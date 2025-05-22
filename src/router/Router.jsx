import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Homepage from '../pages/Homepage'
import Aboutuspage from '../pages/Aboutuspage'
import Singlepage from '../pages/Singlepage'
import Addblog from '../pages/Addblog'
import EditBlog from '../pages/EditBlog'




export default function Router() {
  return (
    <div>
        <BrowserRouter>
        <Header/>
        <Routes>
          <Route path='/' element={<Homepage/>}/>
          <Route path='/Aboutuspage' element={<Aboutuspage/>}/>
          <Route path='/singlepage/:id' element={<Singlepage/>}/>
          <Route path='/addblog' element={<Addblog/>}/>
          <Route path='/editblog/:id' element={<EditBlog/>}/>
        </Routes>
        <Footer/>
        </BrowserRouter>
    </div>
  )
}





