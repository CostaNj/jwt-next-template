import { User } from "./user"
import { Token } from "./token"
import { Error } from "./error"

export type RegistrationReq = {
  email: string
  password: string
}

export type RegistrationRes = { user: User } & Token | Error