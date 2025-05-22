import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {deleteblog, getallblogs} from '../data/newsdata'
import { toast } from 'react-toastify';

export default function Homepage() {
  const navigate = useNavigate();
 const [blogsdata ,setblogsdata] = useState([])
  const fetchBlogs = async()=>{
    try {
      const response =await getallblogs();
      setblogsdata(response.data.newblog);
      console.log(response.data.newblog);
    } catch (error) {
      console.log(error); 
    }
  }

  useEffect(()=>{
    fetchBlogs()
  },[])


  const deleteBlog = async(id)=>{
    try {
      const response =await deleteblog(id)
      console.log('Blog deleted successfully');
      toast.success('Blog deleted successfully')
    } catch (error) {
      console.log(error);
      toast.error('Blog failed to delete')
      
    }
  }


 
  return (
    <>
      <div className="bg-gray-800 p-10 grid gap-10 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
        {
          blogsdata.map((news , index)=>(
            <div key={news._id} className="bg-gray-900 rounded-xl shadow-lg overflow-hidden">
            <img src={news.image} alt='image' className="w-full h-52 object-cover" />
            <div className="p-5 text-white">
              <p className="text-sm text-gray-400 font-bold">{news.author}</p>
              <h2 className="text-lg font-semibold mt-2">{news.title}</h2>
              <p className="text-gray-300 mt-2">{news.content}</p>
              <Link to={`/singlepage/${news._id}`} className="text-blue-400 mt-4 block">Read more...</Link>
              <div className="flex gap-4 mt-4">
                <button onClick={() => navigate(`/editblog/${news._id}`)} className="bg-blue-600 text-white px-4 py-2 rounded">Edit</button>
                <button onClick={()=>deleteBlog(news._id)} className="bg-red-600 text-white px-4 py-2 rounded">Delete</button>
              </div>
            </div>
          </div>
          ))
        }
      </div>
      
    </>
  );
}
