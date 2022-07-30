import React, { FC, ReactNode } from 'react'

import { useAppContext } from '../context'
import NavBar from './nav-bar'

export const Layout: FC<{ children?: ReactNode }> = ({ children }) => {
  const { userData } = useAppContext()
  return (
    <div>
      <NavBar user={userData} />
      {children}
    </div>
  )
}
