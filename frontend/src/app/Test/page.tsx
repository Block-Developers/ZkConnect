import React from 'react'
import Navbar from '../components/Navbar'

const page = () => {
  return (
    <div className='zkhero h-screen pb-[200px]'>
      <Navbar />

      <div  className='mt-[130px]'>
<h1 className='text-[#CA00EB] font-sans text-[56px] text-center font-semibold leading-[59px] '>Instruction</h1>
<div className='px-[100px] text-white font-sans text-[22px] font-normal  leading-[37px] mt-[50px]'>

    <h1 className='mb-[10px]'>
1.Please note that this test is AI-moderated to ensure fairness and accuracy.
    </h1>

    <h1 className='mb-[10px]'>

   2.Please note that this test is AI-moderated to ensure fairness and accuracy.
    </h1>

    <h1 className='mb-[10px]'>
    3.Your results will be analyzed by our AI, and the report will guide the next steps in the hiring process.
    </h1>
<h1 className='mb-[10px]'>
    4.This assessment consists of 10 questions, each with four answer options. 
</h1>

<h1 className='mb-[10px]'>
    5.Please be aware that there is a time limit for each question. 
</h1>

<h1 className='mb-[10px]'>
    6. You&apos;ll have one attempt at this assessment, so make sure you&apos;re in a quiet, distraction-free environment before you start.
</h1>
<h1 className='mb-[10px]'>
    7. Ensure a stable internet connection throughout the assessment to prevent any interruptions.
</h1>
</div>
      </div>

      <div className='flex justify-center items-center mt-[50px]'>
        <button className='text-white font-sans text-[22px] font-normal leading-[38px] bg-[#7D088F] rounded-[11px] py-[20px] px-[35px]'>
            Write Test Now
        </button>
      </div>
    </div>
  )
}

export default page
