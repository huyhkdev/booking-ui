import { JSX } from 'react'
import { Navigate } from 'react-router-dom'

const OwnerProtectedRoute = ({ element }: { element: JSX.Element }) => {
  const user = JSON.parse(localStorage.getItem('userInfo') as string)
  if (!user || user.role !== "owner") {
    return <Navigate to='/' />
  } else {
    return element
  }
}

export default OwnerProtectedRoute
