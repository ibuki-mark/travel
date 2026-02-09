import React from 'react'

interface FormErrorProps{
  message?:string
}


const FormError = ({message}:FormErrorProps) => {
  if(!message) return null 
  return (
    <div className='bg-red-100 p-3 rounded-lg mb-5'>
      <div className='text-sm text-red-500'>{message}</div>
    </div>
  )
}

export default FormError
