import { AxiosError, AxiosResponse } from 'axios'
import { useMutation } from 'react-query'

import { LoginReq, LoginRes } from '../../dtos/auth'
import { login } from '../api/auth'
import { useAppContext } from '../context'

export const useLogin = (
  data: LoginReq,
  handlers?: {
    onSuccess?: () => void
    onError?: (axiosError: AxiosError<Error>) => void
  }
) => {
  const { setUserData } = useAppContext()

  return useMutation<AxiosResponse<LoginRes>, AxiosError<Error>>(
    'registration',
    async () => await login(data.email, data.password),
    {
      onSuccess: (response) => {
        const token = response?.data?.accessToken
        const user = response?.data?.user
        if (token && user) {
          localStorage.setItem('token', token)
          setUserData(user)
          if (handlers?.onSuccess) {
            handlers.onSuccess()
          }
        }
      },
      onError: (error) => {
        if (handlers?.onError) {
          handlers.onError(error)
        }
      }
    }
  )
}
