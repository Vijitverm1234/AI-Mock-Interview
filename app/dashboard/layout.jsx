import React from 'react'
import Header from './_components/Header.jsx'
const layout = ({children}) => {
  return (
    <div>
      <Header></Header>
      <div className='mx-5 md-mx-20 lg:mx-36'>{children} </div>
     
    </div>
  )
}

export default layout
