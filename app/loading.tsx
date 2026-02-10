import React from 'react'

const Loading = () => {
  return (
    <div className='flex justify-center bg-slate-200 h-[90vh] mt-50'>
      <div className='h-15 w-15 animate-spin border-b-5 rounded-full border-sky-500 '></div>
    </div>
  )
}

export default Loading
