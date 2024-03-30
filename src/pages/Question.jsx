
import React, { useEffect, useRef, useState } from 'react'
import {data} from "../database/questions.db"
const Question = () => {

    // const {name,surname} = useSelector()
    let [index,setIndex] = useState(1)
    let [question,setQuestion] = useState(data[index-1])
    return (
        <div className='w-full h-[100vh] bg-[#5cc2eb] containerr '>
                    <div className='relative w-full h-[100vh]'>
                        <form className='absolute  inset-0 flex items-center justify-center  '>
                            <div className=' text-center border-solid rounded-[30px] mt-16 w-[400px] lg:w-[800px] md:w-[600px] p-4 text-white'>
                            {/* <h1 className=' text-[white] font-bold text-[40px]'>Your score is 2</h1>: */}
                                <>
                                <div className='p-3 font-bold text-[30px] text-[red]'>
    
            {/* <h1>2:34</h1>
            <h1>Timer finished!</h1> */}
          
                                </div>
                                {/* <div className='flex justify-center font-bold text-[20px] text-[black]'>
                                    <div className='flex flex-col items-start'>
                                        <h1>Name :</h1>
                                        <h1>Surname :</h1>
                                    </div>
                                    <div className='flex flex-col items-start ml-4'>
                                        <p>Abbos{name}</p>
                                        <p>Norqulov{surname}</p>
                                    </div>
                                </div> */}
                                <div className='flex flex-col gap-3 py-10 mt-4  bg-[#cb9595] rounded-[20px]'>
                                    <div className='flex gap-1 px-2 font-medium text-[25px]'>
                                        <h1 className=''>Question</h1>
                                        <p>{index}</p>/<p className='text-[26px]'>{data.length}</p>
                                    </div>
                                    <div className='flex p-2 bg-green'>
                                        <h2 className=' text-start  w-[60%]'>1.saolllards</h2>
                                        
                                            <div className='flex flex-col justify-start w-[200px]  '>
                                                <p className='border-[4px] border-solid border-[#00f7ff] rounded-[20px] mb-4 bg-[white] text-[black] cursor-pointer'    >xcs</p>
                                                <p className='border-[4px] border-solid border-[#00f7ff] rounded-[20px] mb-4 bg-[white] text-[black] cursor-pointer'   >toshkent</p>
                                                <p className='border-[4px] border-solid border-[#00f7ff] rounded-[20px] mb-4 bg-[white] text-[black] cursor-pointer'    >toshkent</p>
                                                <p className='border-[4px] border-solid border-[#00f7ff] rounded-[20px] mb-4 bg-[white] text-[black] cursor-pointer'    >toshkent</p>
                                            </div>
                                    </div>
                                </div>
                                <p className='text-[white] font-bold bg-[green] text-[30px] mt-[20px] w-[200px] rounded-[20px] cursor-pointer' >Next</p>
                                    </>
                                    
                                    <div className='flex justify-center gap-5'>
    
                                {/* {result ? <p className='text-[white] font-bold bg-[green] text-[30px] mt-[20px] w-[200px] rounded-[20px]' onClick={Reset}>Reset</p>: " "} */}
                                {/* {result ? <p className='text-[white] text-center font-bold bg-[red] text-[30px] m-[20px] w-[200px] rounded-[20px] cursor-pointer' onClick={Exit}>Exit</p>: " "} */}
                            
                                    </div>
                            </div>
                        </form>
                    </div>
        </div>
      )
};

export default Question;



// import React, { useState } from 'react';

// const QuizApp = () => {
//   const questions = [
//     {
//       question: 'What is the capital of France?',
//       options: ['Paris', 'London', 'Berlin', 'Rome'],
//       answer: 'Paris'
//     },
//     {
//       question: 'Which is the largest planet in our solar system?',
//       options: ['Jupiter', 'Saturn', 'Neptune', 'Earth'],
//       answer: 'Jupiter'
//     },
//     {
//       question: 'Who painted the Mona Lisa?',
//       options: ['Vincent van Gogh', 'Pablo Picasso', 'Leonardo da Vinci', 'Michelangelo'],
//       answer: 'Leonardo da Vinci'
//     }
//   ];

//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [userAnswers, setUserAnswers] = useState([]);
//   const [showResults, setShowResults] = useState(false);

//   const handleOptionChange = (event) => {
//     const { value } = event.target;
//     setUserAnswers([...userAnswers.slice(0, currentQuestion), value, ...userAnswers.slice(currentQuestion + 1)]);
//   };

//   const handlePrevious = () => {
//     setCurrentQuestion(currentQuestion - 1);
//   };

//   const handleNext = () => {
//     setCurrentQuestion(currentQuestion + 1);
//   };

//   const handleCheckAnswers = () => {
//     setShowResults(true);
//   };

//   const renderOptions = () => {
//     const { options } = questions[currentQuestion];
//     return options.map((option, index) => (
//       <div key={index}>
//         <label>
//           <input
//             type="radio"
//             value={option}
//             checked={userAnswers[currentQuestion] === option}
//             onChange={handleOptionChange}
//           />
//           {option}
//         </label>
//       </div>
//     ));
//   };

//   const renderQuiz = () => {
//     if (showResults) {
//       return (
//         <div>
//           <h2>Results</h2>
//           {questions.map((question, index) => (
//             <div key={index}>
//               <p>{question.question}</p>
//               <p>Your Answer: {userAnswers[index]}</p>
//               <p>Correct Answer: {question.answer}</p>
//             </div>
//           ))}
//         </div>
//       );
//     }

//     return (
//       <div>
//         <h2>Quiz</h2>
//         <p>{questions[currentQuestion].question}</p>
//         {renderOptions()}
//         <button disabled={currentQuestion === 0} onClick={handlePrevious}>Previous</button>
//         {currentQuestion < questions.length - 1 && <button onClick={handleNext}>Next</button>}
//         {currentQuestion === questions.length - 1 && <button onClick={handleCheckAnswers}>Check Answers</button>}
//       </div>
//     );
//   };

//   return (
//     <div>
//       {renderQuiz()}
//     </div>
//   );
// };

// export default QuizApp;