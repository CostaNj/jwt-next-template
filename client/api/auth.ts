import { RegistrationReq, RegistrationRes } from '../../dtos/auth'
import { useAxios } from '../axios'

export const registration = async (email: string, password: string) => {
  const data: RegistrationReq = { email, password }
  return await useAxios.post<RegistrationRes>('/api/auth/registration', data)
}

export const login = async (email: string, password: string) => {
  const data: RegistrationReq = { email, password }
  return await useAxios.post<RegistrationRes>('/api/auth/login', data)
}
