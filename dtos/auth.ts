import { PublicUserData } from "./user"
import { Error } from "./error"

export type RegistrationReq = {
  email: string
  password: string
}

export type RegistrationRes = { user: PublicUserData, accessToken: string } | Error