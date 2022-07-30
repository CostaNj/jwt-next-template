import { PublicUserData } from './user'

export type RegistrationReq = {
  email: string
  password: string
}

export type RegistrationRes = {
  user: PublicUserData
  accessToken: string
}

export type LoginReq = {
  email: string
  password: string
}

export type LoginRes = {
  user: PublicUserData
  accessToken: string
}
