import { AxiosResponse } from 'axios'
import React, { FC, ReactNode } from 'react'
import { useQuery } from 'react-query'

import { RefreshRes } from '../../dtos/auth'
import { refresh } from '../api/auth'
import { useAppContext } from '../context'
import NavBar from './nav-bar'

export const Layout: FC<{ children?: ReactNode }> = ({ children }) => {
  const { userData, setUserData } = useAppContext()

  const { data, error, isLoading } = useQuery<AxiosResponse<RefreshRes>>(
    'refresh',
    refresh,
    {
      enabled:
        typeof window !== 'undefined' &&
        !!localStorage.getItem('token') &&
        !userData,
      onSuccess: (response) => {
        const token = response?.data?.accessToken
        const user = response?.data?.user
        if (token && user) {
          localStorage.setItem('token', token)
          setUserData(user)
        }
      }
    }
  )

  // TODO: LOADING !! HYDRATE PROBLEM !!
  // LinearProgress

  return (
    <div>
      <NavBar user={userData} />
      <main>{children}</main>
    </div>
  )
}
