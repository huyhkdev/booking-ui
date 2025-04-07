interface ButtonAdntProps {
  label: string
  style?: string
  isLoading?: boolean
}

const ButtonAdnt = ({ label, style, isLoading = false }: ButtonAdntProps) => {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className={`
        w-full py-2 px-4 border border-transparent rounded-md shadow-sm 
        text-sm font-medium text-white bg-[#FF385C] hover:bg-[#FF385C]/90 
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF385C] 
        disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center 
        ${style}
      `}
    >
      {isLoading ? (
        <svg
          className="animate-spin h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
      ) : (
        label
      )}
    </button>
  )
}

export default ButtonAdnt
