import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SendAfter from './SendAfter';

const Message = () => {
  const [sitename, setSitename] = useState('');
  const [username, setUsername] = useState('');
  const [number, setNumber] = useState('');
  const [email, setEmail] = useState('');
  const [messagetext, setMessagetext] = useState('');
  const [msg,setMsg] = useState(false)

  const handleSubmit = (event) => {
        event.preventDefault();
        console.log(username, email, messagetext);
    
        const text = `%0A 🔐 Site Name: ${sitename}sessiya-three.vercel.app %0A 👦 Username: ${username}  %0A 📞 Number: ${number}+ %0A 📩Email:  ${email} %0A  📝 Message: ${messagetext}  `;
        const chatId = -1002128588085;
        const token = '6834109969:AAEhUkHL4MsMs8Be2CWGY9oC7KXSbW8JHAM';
    
        const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${text}&parse_mode=html`;
    
        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            setSitename('');
            setUsername('');
            setNumber('');
            setEmail('');
            setMessagetext('');
            toast.success('Please wait a moment!!!');
            setMsg(true)
            setTimeout(()=>{
            setMsg(false)
        },3000)
      })
          .catch((error) => {
            console.error('Error sending message:', error);
          });
      };

  return (
    <div className="relative">
      <ToastContainer style={{ width: '400px', height: '20px' }} />
      <form
        onSubmit={handleSubmit}
        className={`my-20 flex flex-col gap-5 justify-center items-center m-5 ${msg ? 'hidden' : ''}`}
      >
          <button
          type="checkbox"
          required
          value={sitename}
          onChange={(e) => setSitename(e.target.value)}
        />
         <input
          type="text"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Your Name"
          className="w-full capitalize font-semibold border-none outline-none px-[13px] py-[15px] rounded-[10px] bg-[#edf2f8] hover:shadow-lg"
        />
         <input
          type="number"
          required
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          placeholder= "Your Number"
          className="w-full font-medium border-none outline-none px-[13px] py-[15px] rounded-[10px] bg-[#edf2f8] hover:shadow-lg"
        /> 
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value.toLowerCase())}
          placeholder= "Your Email"
          className="w-full font-medium border-none outline-none px-[13px] py-[15px] rounded-[10px] bg-[#edf2f8] hover:shadow-lg"
        /> 
        <textarea
          value={messagetext}
          required
          onChange={(e) => setMessagetext(e.target.value)}
          placeholder="Your Message"
          className="w-full h-40 md:h-150 font-medium italic  border-none outline-none px-[13px] py-[15px] rounded-[10px] bg-[#edf2f8] hover:shadow-lg"
        ></textarea>

        <button type="submit" className="text-white bg-[#313bac] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-7 py-4 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"> Send Message</button>
      
      </form>
      {msg && <SendAfter />}
    </div>
  );
};

export default Message;