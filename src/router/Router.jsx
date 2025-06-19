import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Homepage from '../pages/Homepage'
import Aboutuspage from '../pages/Aboutuspage'
import Singlepage from '../pages/Singlepage'
import Addblog from '../pages/Addblog'
import EditBlog from '../pages/EditBlog'
import Loginpage from '../pages/Loginpage'
import Registerpage from '../pages/Registerpage'
import Validation from '../pages/Validation'




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
          <Route path='/login' element={<Loginpage/>}/>
          <Route path='/register' element={<Registerpage/>}/>
          <Route path='/verify' element={<Validation/>}/>
        </Routes>
        <Footer/>
        </BrowserRouter>
    </div>
  )
}





