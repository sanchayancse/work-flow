import React, { ReactNode } from 'react'

const layout = ({children}: {children: ReactNode}) => {
  return (
    <div className='flex flex-col h-screen justify-center items-center'>{children}</div>
  )
}

export default layout