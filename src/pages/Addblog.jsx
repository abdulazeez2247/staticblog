import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import { createnewblog } from '../data/newsdata';
import { toast } from 'react-toastify';

export default function Addblog() {
  const [image, setImage] = useState('');
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  

   const navigate = useNavigate()
  const submitform = async (e) => {
    e.preventDefault()
    const formdata = {
      image:image,
      author:author,
      title:title,
      content:content
    }

    try {
      const response = await createnewblog(formdata)
      console.log(response.data.newblog);
      toast.success('Blog added successfully')
      navigate('/')
      
    } catch (error) {
      console.log(error);
      toast.error('Blog failed to add')
    }
   
  };


  
  return (
    <>
 
      <div className="bg-gray-800 text-white text-center py-5 min-h-screen">
        <p className="text-3xl mt-8 font-extrabold">Add News Item</p>
        <form onSubmit={submitform} className="mt-7 space-y-4">
          <input className="w-11/12 p-3 border bg-gray-700" type="text" placeholder="Image path (e.g., /image/blog4.png)" value={image} onChange={(e) => setImage(e.target.value)} />
          <input className="w-11/12 p-3 border bg-gray-700" type="text" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
          <input className="w-11/12 p-3 border bg-gray-700" type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <textarea className="w-11/12 p-3 h-40 border bg-gray-700" placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} />
          <button  type="submit" className="w-11/12 py-3 bg-gradient-to-r from-gray-600 to-gray-900 rounded text-xl">Submit</button>
        </form>
      </div>
    </>
  );
}
