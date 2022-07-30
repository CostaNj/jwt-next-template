import { AxiosError, AxiosResponse } from 'axios'
import { useMutation } from 'react-query'

import { RegistrationReq, RegistrationRes } from '../../dtos/auth'
import { registration } from '../api/auth'
import { useAppContext } from '../context'

export const useRegistration = (
  data: RegistrationReq,
  handlers?: {
    onSuccess?: () => void
    onError?: (axiosError: AxiosError<Error>) => void
  }
) => {
  const { setUserData } = useAppContext()

  return useMutation<AxiosResponse<RegistrationRes>, AxiosError<Error>>(
    'registration',
    async () => await registration(data.email, data.password),
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
