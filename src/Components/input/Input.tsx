/* eslint-disable @typescript-eslint/no-explicit-any */
interface CustomInputProps {
  label: string
  type?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: any
  errors?: any
  required?: boolean
  placeholder?: string
}

const Input: React.FC<CustomInputProps> = ({
  label,
  type = '', // Default type is 'text'
  register,
  errors,
  required = false,
  placeholder = ''
}) => {
  return (
    <div className='relative'>
      <input
        type={type} // Use the type prop here
        {...register(label, { required })}
        required={required}
        className='mt-3 block w-full px-4 py-3 pt-5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary peer text-sm'
        placeholder={placeholder}
      />
      <label className='absolute text-sm font-medium text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 left-4 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-3 peer-placeholder-shown:text-gray-500 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-primary'>
        {label}
      </label>
      {errors && errors[label.toLowerCase()] && (
        <p className='text-red-500 mt-1'>{errors[label.toLowerCase()].message}</p>
      )}
    </div>
  )
}

export default Input
