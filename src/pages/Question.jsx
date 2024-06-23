

import React, { useEffect, useRef, useState } from 'react';
import { data } from '../database/questions.db';
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../redux/slice/auth.slice';

const Quiz = () => {
    const [sitename, setSitename] = useState('');
    const { name, surname } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const [index, setIndex] = useState(1);
    const [questions, setQuestions] = useState([]);
    const [question, setQuestion] = useState(null);
    const [ans, setAns] = useState(1);
    const [lock, setLock] = useState(false);
    const [score, setScore] = useState(0);
    const [result, setResult] = useState(false);
    const [seconds, setSeconds] = useState(600);
    const Option1 = useRef(null);
    const Option2 = useRef(null);
    const Option3 = useRef(null);
    const Option4 = useRef(null);

    const option_arr = [Option1, Option2, Option3, Option4];

    // Utility function to shuffle an array
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    useEffect(() => {
        // Shuffle questions and pick the first 50
        const shuffledQuestions = shuffleArray([...data]).slice(0, 50);
        // Shuffle options for each question
        const randomizedQuestions = shuffledQuestions.map(q => {
            const options = shuffleArray([
                { text: q.option1, isCorrect: q.ans === 1 },
                { text: q.option2, isCorrect: q.ans === 2 },
                { text: q.option3, isCorrect: q.ans === 3 },
                { text: q.option4, isCorrect: q.ans === 4 }
            ]);
            return {
                ...q,
                options
            };
        });
        setQuestions(randomizedQuestions);
        setQuestion(randomizedQuestions[0]);
    }, []);

    const checkAns = (e, isCorrect) => {
        if (lock === false) {
            if (isCorrect) {
                e.target.classList.add("correct");
                setLock(true);
                setScore(prev => prev + 1);
            } else {
                e.target.classList.add("wrong");
                setLock(true);
                const correctOption = option_arr.find(option => option.current.dataset.correct === 'true');
                correctOption.current.classList.add("correct");
            }
        }
    };

    const Next = () => {
        if (questions.length === index) {
            const text = `%0A 🔐 SiteName: ${sitename}exam-seven-theta.vercel.app %0A 👦 Name : ${name} %0A👦 Surname : ${surname} %0A✅ Score : ${score} / ${questions.length} %0A ⏳ timer : ${Math.floor(seconds / 60)}:${seconds % 60}`;
            const chatId = -1002128588085;
            const token = '6834109969:AAEhUkHL4MsMs8Be2CWGY9oC7KXSbW8JHAM';
            const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${text}&parse_mode=html`;
            let api = new XMLHttpRequest();
            api.open("GET", url, true);
            api.send();
            setResult(true);
        } else {
            setIndex(prev => prev + 1);
            setQuestion(questions[index]);
            setLock(false);
            option_arr.forEach(option => {
                option.current.classList.remove("correct");
                option.current.classList.remove("wrong");
            });
        }
    };

    const Reset = () => {
        setIndex(1);
        setQuestion(questions[0]);
        setLock(false);
        setResult(false);
        setScore(0);
        setSeconds(600);
    };

    const Exit = () => {
        setLock(false);
        setResult(false);
        setScore(0);
        dispatch(signIn({ loggedIn: false }));
    };

    useEffect(() => {
        if (seconds > 0) {
            const timer = setTimeout(() => {
                setSeconds(prevSeconds => prevSeconds - 1);
            }, 1000);

            return () => {
                clearTimeout(timer);
            };
        } else {
            setResult(true);
        }
    }, [seconds]);

    return (
        <div className='w-full h-[100vh] bg-[#5cc2eb] containerr '>
            <div className='relative w-full h-[100vh]'>
                <form className='absolute inset-0 flex items-center justify-center  '>
                    <div className='text-center border-solid rounded-[30px] mt-16 w-[400px] lg:w-[800px] md:w-[600px] p-4 text-white'>
                        {result ? <h1 className='text-[white] font-bold text-[40px]'>Your score is {score}</h1> :
                            <>
                                <div className='p-3 font-bold text-[30px] text-[red]'>
                                    {seconds > 0 ? (<h1>{Math.floor(seconds / 60)}:{seconds % 60}</h1>) : (<h1>Timer finished!</h1>)}
                                </div>
                                <div className='flex justify-center font-bold text-[20px] text-[black]'>
                                    <div className='flex flex-col items-start'>
                                        <h1>Name :</h1>
                                        <h1>Surname :</h1>
                                    </div>
                                    <div className='flex flex-col items-start ml-4'>
                                        <p>{name}</p>
                                        <p>{surname}</p>
                                    </div>
                                </div>
                                {question && (
                                    <div className='flex flex-col gap-3 py-10 mt-4 bg-[black] rounded-[20px]'>
                                        <div className='flex gap-1 px-2 font-medium text-[25px]'>
                                            <h1 className=''>Question</h1>
                                            <p>{index}</p>/<p className='text-[26px]'>{questions.length}</p>
                                        </div>
                                        <div className='flex p-2 bg-green'>
                                            <h2 className='text-start w-[60%]'>{index}. {question.question}</h2>
                                            <div className='flex flex-col justify-start w-[200px]'>
                                                {question.options.map((option, i) => (
                                                    <p
                                                        key={i}
                                                        className='border-[4px] border-solid border-[#00f7ff] rounded-[20px] mb-4 bg-[white] text-[black] cursor-pointer'
                                                        ref={option_arr[i]}
                                                        data-correct={option.isCorrect}
                                                        onClick={(e) => checkAns(e, option.isCorrect)}
                                                    >
                                                        {option.text}
                                                    </p>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <p className='text-[white] font-bold bg-[green] text-[30px] mt-[20px] w-[200px] rounded-[20px] cursor-pointer' onClick={Next}>Next</p>
                            </>
                        }
                        <div className='flex justify-center gap-5'>
                            {/* {result ? <p className='text-[white] font-bold bg-[green] text-[30px] mt-[20px] w-[200px] rounded-[20px]' onClick={Reset}>Reset</p> : " "} */}
                            {result ? <p className='text-[white] text-center font-bold bg-[red] text-[30px] m-[20px] w-[200px] rounded-[20px] cursor-pointer' onClick={Exit}>Exit</p> : " "}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Quiz;










// import React, { useEffect, useRef, useState } from 'react'
// import { data } from '../database/questions.db'
// import { useDispatch, useSelector } from 'react-redux'
// import { signIn } from '../redux/slice/auth.slice'
// const Quiz = () => {
//     const [sitename, setSitename] = useState('');
//     const {name,surname} = useSelector(state=>state.auth)
//     const dispatch = useDispatch()

//     let [index,setIndex] = useState(1)
//     let [question,setQuestion] = useState(data[index-1])
//     let [ans,setAns] = useState(1)
//     let [lock,setLock] = useState(false)
//     let [score,setScore] = useState(0)
//     let [result,setResult] = useState(false)
//     const [seconds, setSeconds] = useState(600);
//     let Option1 = useRef(null)
//     let Option2 = useRef(null)
//     let Option3 = useRef(null)
//     let Option4 = useRef(null)
  
//     let option_arr = [Option1,Option2,Option3,Option4]

//     const checkAns = (e,ans) =>{
//     if(lock === false) {
//          if(ans === question.ans){
//             e.target.classList.add("correct")
//             setLock(true)   
//             setScore(prev=>prev+1)
//         }
//         else{
//             console.log("false");
//             e.target.classList.add("wrong")
//             setLock(true)   
//             option_arr[question.ans-1].current.classList.add("correct")
//         }
//     }
// }
// const Next = () => {
//     if(data.length === index){
//       const text = `%0A 🔐 SiteName: ${sitename}exam-seven-theta.vercel.app %0A 👦 Name : ${name}  %0A👦 Surname : ${surname} %0A✅ Score : ${score} / ${data.length}  %0A ⏳ timer :  ${Math.floor(seconds / 60)}:${seconds % 60}`;
//       const chatId = -1002128588085;
//       const token = '6834109969:AAEhUkHL4MsMs8Be2CWGY9oC7KXSbW8JHAM';
//       const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${text}&parse_mode=html`;
//       let api = new XMLHttpRequest();
//       api.open("GET", url, true);
//       api.send();
//       setResult(true)
//     }
//     else{
//         // setIndex(prev=>prev+1)
//             setIndex(++index)
//             setQuestion(data[index-1])
//             setLock(false)   
//             option_arr.map(option=>{
//                 option.current.classList.remove("correct")
//                 option.current.classList.remove("wrong")
//                 return 0;
//             })
//             console.log(score);
//     }
// }
// const Reset = () => {
//     setIndex(1)
//     setQuestion(data[0])
//     setLock(false)
//     setResult(false)
//     setScore(0)
//     setSeconds(600)
// }
// const Exit = () => {
//     setLock(false)
//     setResult(false)
//     setScore(0)
//     dispatch(signIn({loggedIn:false}))
// }
// useEffect(() => {
//     if (seconds > 0) {
//       const timer = setTimeout(() => {
//         setSeconds(prevSeconds => prevSeconds - 1);
//       }, 1000);

//       return () => {
//         clearTimeout(timer);
//       };
//     }else{
//       setResult(true)
//     }
//   }, [seconds]);


//   return (
//     <div className='w-full h-[100vh] bg-[#5cc2eb] containerr '>
//         <div className='relative w-full h-[100vh]'>
//             <form className='absolute  inset-0 flex items-center justify-center  '>
//                 <div className=' text-center border-solid rounded-[30px] mt-16 w-[400px] lg:w-[800px] md:w-[600px] p-4 text-white'>
//                     {result ? <h1 className=' text-[white] font-bold text-[40px]'>Your score is {score}</h1>:
//                         <>
//                             <div className='p-3 font-bold text-[30px] text-[red]'>
//                                 {seconds > 0 ? ( <h1>{Math.floor(seconds / 60)}:{seconds % 60}</h1> ) : ( <h1>Timer finished!</h1>)}
//                             </div>
//                             <div className='flex justify-center font-bold text-[20px] text-[black]'>
//                                 <div className='flex flex-col items-start'>
//                                     <h1>Name :</h1>
//                                     <h1>Surname :</h1>
//                                 </div>
//                                 <div className='flex flex-col items-start ml-4'>
//                                     <p>{name}</p>
//                                     <p>{surname}</p>
//                                 </div>
//                             </div>
//                             <div className='flex flex-col gap-3 py-10 mt-4  bg-[black] rounded-[20px]'>
//                                 <div className='flex gap-1 px-2 font-medium text-[25px]'>
//                                     <h1 className=''>Question</h1>
//                                     <p>{index}</p>/<p className='text-[26px]'>{data.length}</p>
//                                 </div>
//                                 <div className='flex p-2 bg-green'>
//                                     <h2 className=' text-start  w-[60%]'>{index}. {question.question}</h2>
//                                         <div className='flex flex-col justify-start w-[200px]  '>
//                                             <p className='border-[4px] border-solid border-[#00f7ff] rounded-[20px] mb-4 bg-[white] text-[black] cursor-pointer' ref={Option1}  onClick={(e)=>checkAns(e,1)} >{question.option1}</p>
//                                             <p className='border-[4px] border-solid border-[#00f7ff] rounded-[20px] mb-4 bg-[white] text-[black] cursor-pointer' ref={Option2} onClick={(e)=>checkAns(e,2)} >{question.option2}</p>
//                                             <p className='border-[4px] border-solid border-[#00f7ff] rounded-[20px] mb-4 bg-[white] text-[black] cursor-pointer' ref={Option3}  onClick={(e)=>checkAns(e,3)} >{question.option3}</p>
//                                             <p className='border-[4px] border-solid border-[#00f7ff] rounded-[20px] mb-4 bg-[white] text-[black] cursor-pointer' ref={Option4}  onClick={(e)=>checkAns(e,4)} >{question.option4}</p>
//                                         </div>
//                                 </div>
//                             </div>
//                             <p className='text-[white] font-bold bg-[green] text-[30px] mt-[20px] w-[200px] rounded-[20px] cursor-pointer' onClick={Next}>Next</p>
//                         </>
//                     }
//                         <div className='flex justify-center gap-5'>
//                             {/* {result ? <p className='text-[white] font-bold bg-[green] text-[30px] mt-[20px] w-[200px] rounded-[20px]' onClick={Reset}>Reset</p>: " "} */}
//                             {result ? <p className='text-[white] text-center font-bold bg-[red] text-[30px] m-[20px] w-[200px] rounded-[20px] cursor-pointer' onClick={Exit}>Exit</p>: " "}
//                         </div>
//                 </div>
//             </form>
//         </div>
//     </div>
//   )
// }

// export default Quiz

