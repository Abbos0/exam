import React,{ useState } from 'react';
import { useDispatch } from 'react-redux';
import { signIn } from '../redux/slice/auth.slice';
const Entrance = () => {
  const dispatch = useDispatch()
  const [sitename, setSitename] = useState('');
  const [name, setname] = useState('');
    const [surname, setsurname] = useState('');
    const handleSubmit = (event) => {
      dispatch(signIn({loggedIn:true,name:name,surname:surname}))
      event.preventDefault();
      setsurname('')
      setname('')
      setSitename('');
    };

  return (
    <div className='relative img w-full h-[100vh]'>
      <form onSubmit={handleSubmit} className='absolute  inset-0 flex items-center justify-center  '>
          <div className=' backdrop-blur  border-solid border-[1px] rounded-[30px] w-[350px] lg:w-[400px] h-[350px] lg:h-[400px] text-white'>
            <h1 className='text-center font-bold p-3 text-[30px] mt-10' >Global Test IT</h1>
            <div className='flex flex-col items-center px-[50px] gap-3 py-10'>
              <input type='text'
               value={name}
               required
               onChange={(e) => setname(e.target.value)} className='tracking-wider capitalize w-full font-medium text-white text-[20px] px-3 outline-none bg-transparent border-solid border-white border-b-[3px] ' placeholder='Name' />
              <input type='text' 
              required
              value={surname}
              onChange={(e) => setsurname(e.target.value)} className='tracking-wider capitalize w-full font-medium text-white text-[20px] px-3 outline-none bg-transparent border-solid border-white border-b-[3px] ' placeholder='Surname' />
              <button className='mt-5 text-[black] w-full h-[40px] hover:bg-[green] bg-[#3aab69] rounded-[30px] text-[25px] font-bold'>Send</button>
            </div>
          </div>
      </form>
    </div>
  );
};

export default Entrance;
