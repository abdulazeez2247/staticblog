import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { editoneblog, getoneblog } from '../data/newsdata';
import { toast } from 'react-toastify';
// import newsdata from '../data/newsdata';


export default function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [image, setImage]= useState('');
  const [title, setTitle]= useState('');
  const [author, setAuthor]= useState('');
  const [content, setContent]= useState('');


  const getblog = async ()=>{
    try {
      const response = await getoneblog(id)
      console.log();
      
      if (response) {
        setAuthor(response.data.newblog.author)
        setImage(response.data.newblog.image)
        setTitle(response.data.newblog.title)
        setContent(response.data.newblog.content)
      }
    } catch (error) {
      console.log(error);
      
    }
  }
  useEffect(()=>{
    getblog()
  },[id])

  const dataitem = {
    image:image,
    author:author,
    content:content,
    title:title
  }
  const handlesubmit = async (e)=>{
    e.preventDefault()
   try {
      const response = await editoneblog(id ,dataitem)
      toast.success('Edit blog  successfully')
      navigate('/')
   } catch (error) {
      toast.error('Blog failed to edit')
      console.log(error);
    
   } 
  }
 
  
  return (
    <>
      <div className="bg-gray-800 text-white min-h-screen p-10 text-center">
        <p className="text-3xl font-extrabold mb-8">Edit Blog</p>
        <form onSubmit={handlesubmit} className="space-y-4">
          <input className="w-11/12 p-3 border bg-gray-700" value={image} onChange={(e) => setImage(e.target.value)} />
          <input className="w-11/12 p-3 border bg-gray-700" value={author} onChange={(e) => setTitle(e.target.value)} />
          <input className="w-11/12 p-3 border bg-gray-700" value={title} onChange={(e) => setAuthor(e.target.value)} />
          <textarea className="w-11/12 h-40 p-3 border bg-gray-700" value={content} onChange={(e) => setContent(e.target.value)} />
          <button type="submit" className="w-[40%] py-5 bg-blue-700 rounded text-xl hover:bg-blue-400 ">Submit</button>
        </form>
      </div>
    </>
  );
}
