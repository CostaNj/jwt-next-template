import jwt from 'jsonwebtoken'
import { Token } from '../../dtos/token'
import { PublicUserData } from '../../dtos/user'

export const generateTokens = (user: PublicUserData): Token | null => {
  const accessSecret = process.env.SECRET_ACCESS
  const refreshSecret = process.env.SECRET_REFRESH
  if(accessSecret && refreshSecret) {
    const accessToken = jwt.sign({
      //Signing a token with 1 hour of expiration:
      exp: Math.floor(Date.now() / 1000) + (60 * 60),
      data: user
    }, accessSecret)

    //Signing a token with 30 days  of expiration:
    const refreshToken = jwt.sign({
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7 * 30),
      data: user
    }, refreshSecret);

    return {
      accessToken,
      refreshToken
    }
  }

  return null
}