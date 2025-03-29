interface ButtonAdntProps {
  label: string
  style?: string
}
const ButtonAdnt = ({ label, style }: ButtonAdntProps) => {
  return (
    <button
      type='submit'
      className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#FF385C] hover:bg-[#FF385C]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF385C] ${style}`}
    >
      {label}
    </button>
  )
}

export default ButtonAdnt
