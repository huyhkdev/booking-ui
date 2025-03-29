import { Skeleton } from "antd"
import React from "react";
const LoadingElement = () => {
  return (
    <div>
      {[...Array(10)].map((_, index) => (
        <Skeleton key={index} className='mb-4 w-full' active />
      ))}
    </div>
  )
}

export default LoadingElement
