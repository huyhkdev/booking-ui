import { Spin } from "antd"
import React from "react";
const LoadingSpin = () => {
  return (
    <div className=' w-full h-full flex items-center justify-center items-center'>
      {' '}
      <Spin size='large' tip='Loading'></Spin>
    </div>
  )
}

export default LoadingSpin
