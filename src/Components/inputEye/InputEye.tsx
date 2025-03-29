/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'

interface CustomInputProps {
  label: string
  type?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: any
  errors?: any
  required?: boolean
  placeholder?: string
}

const InputEye: React.FC<CustomInputProps> = ({ label, register, errors, required = false, placeholder = '' }) => {
  const [showPassword, setShowPassword] = useState(false)
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }
  return (
    <div className='relative'>
      <input
        type={showPassword ? 'text' : 'password'}
        {...register(label.toLowerCase(), { required })}
        required={required}
        className='mt-3 block w-full px-4 py-3 pt-5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary peer text-sm'
        placeholder={placeholder}
      />
      <label className='absolute text-sm font-medium text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 left-4 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-3 peer-placeholder-shown:text-gray-500 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-primary'>
        {label}
      </label>
      <button
        type='button'
        onClick={togglePasswordVisibility}
        className='absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5'
      >
        {showPassword ? (
          <svg
            /* SVG for eye icon */ xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-5 text-gray-500'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88'
            />
          </svg>
        ) : (
          <svg
            /* SVG for eye-off icon */ xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-5 text-gray-500'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z'
            />
            <path strokeLinecap='round' strokeLinejoin='round' d='M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z' />
          </svg>
        )}
      </button>
      {errors && errors[label.toLowerCase()] && (
        <p className='text-red-500 mt-1'>{errors[label.toLowerCase()].message}</p>
      )}
    </div>
  )
}

export default InputEye
