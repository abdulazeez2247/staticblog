import axios from "axios";

// const apiurl = "http://localhost:5000/api";
const apiurl = "https://blogbackend-fa17.onrender.com/api";
const getallblogs = async () => {
  return await axios.get(`${apiurl}/getallblogs`);
};
const createnewblog = async (formdata) => {
  return await axios.post(`${apiurl}/blog` , formdata);
};
const getoneblog = async (id) => {
  return await axios.get(`${apiurl}/getoneblog/${id}`);
};
const editoneblog = async (id ,formdata) => {
  return await axios.put(`${apiurl}/editoneblog/${id}` ,formdata);
};
const deleteblog = async (id) => {
  return await axios.delete(`${apiurl}/deleteoneblog/${id}`);
};
export{getallblogs, createnewblog, getoneblog, editoneblog, deleteblog };

