import { PublicUserData } from "./user"

export type RegistrationReq = {
  email: string
  password: string
}

export type RegistrationRes = {
  user: PublicUserData,
  accessToken: string
}