import React, { useContext, useState } from 'react'
import { PublicUserData } from '../../dtos/user'

type AppContext = {
  userData: PublicUserData | null
  setUserData: (newData: PublicUserData) => void
}

type Props = {
  children?: React.ReactNode
}

export const initialState: AppContext = {
  userData: null,
  setUserData: () => {}
}

export const Context = React.createContext<AppContext>(initialState)

export const ContextProvider: React.FC<Props> = ({ children }) => {
  const [userData, setUserData] = useState(initialState.userData)

  return (
    <Context.Provider value={{ userData, setUserData }}>
      {children}
    </Context.Provider>
  )
}

export const useAppContext = () => useContext(Context)
