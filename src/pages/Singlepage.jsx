import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getoneblog } from '../data/newsdata';
export default function Singlepage() {
  const navigate = useNavigate()
  const {id} = useParams();
  const [getblog, setGetblog]= useState({
    author:'',
    content:'',
    title:'',
    image:'',
  })
  const getsingleblog = async(id)=>{
    console.log('Route id:',id);
    
    try {
      const response = await getoneblog(id)
      setGetblog(response.data.newblog)
      console.log(response.data.newblog);
      console.log('response',response);
    
    } catch (error) {
      console.log('Error fetching',error);
      
    }
  }
  useEffect(()=>{
    getsingleblog(id)
  },[id])
  return (
    <>
      <div className="bg-gray-600 text-white min-h-screen p-10">
        <img src={getblog.image} alt={getblog.title} className="w-full h-96 object-cover rounded-lg mb-6" />
        <h1 className="text-4xl font-bold mb-3">{getblog.title}</h1>
        <p className="text-gray-400 mb-4">By {getblog.author}</p>
        <p className="text-lg">{getblog.content}</p>
        
      </div>
    </>
  );
}
