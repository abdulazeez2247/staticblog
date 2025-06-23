import axios from "axios";

const apiurl = "http://localhost:5000/api";
// const apiurl = "https://blogbackend-fa17.onrender.com/api";
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
const registeruser = async (formdata) => {
    return await axios.post(`${apiurl}/register`, formdata)
};
const verifyOTP = async ({userId, otp}) => {
    return await axios.post(`${apiurl}/verify`, {userId, otp})
};
const resendOtp = async ({email}) =>{
    return await axios.post(`${apiurl}/resend`, {email})
};
const loginUser = async ({ email, password }) => {
  return await axios.post(`${apiurl}/login`, { email, password });
};
const forgetpassword = async ({ email }) => {
  return await axios.post(`${apiurl}/forgetpassword`, { email });
};

const newpassword = async ({ email, otp, newPassword, confirmPassword }) => {
  return await axios.post(`${apiurl}/newpassword`, {
    email,
    otp,
    newPassword,
    confirmPassword
  });
};

const verifypasswordotp = async ({ email, otp }) => {
  return await axios.post(`${apiurl}/verifypasswordotp`, { email, otp });
};

export {
  getallblogs,
  createnewblog,
  getoneblog,
  editoneblog,
  deleteblog,
  registeruser,
  verifyOTP,
  resendOtp,
  loginUser,
  forgetpassword,
  newpassword,
  verifypasswordotp
};
