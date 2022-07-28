import React, { ReactNode, FC } from 'react'
import NavBar from './nav-bar'
import { useAppContext } from '../context'

export const Layout: FC<{ children?: ReactNode}> = ({ children }) => {
  const { userData } = useAppContext()
  return (
    <div>
      <NavBar user={userData}/>
      {children}
    </div>
  )
}