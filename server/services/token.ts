import cookie from 'cookie'
import jwt from 'jsonwebtoken'
import { NextApiResponse } from 'next'

import { Token } from '../../dtos/token'
import { PublicUserData } from '../../dtos/user'

type TokenType = 'access' | 'refresh'

export const generateToken = (
  userData: PublicUserData,
  type: TokenType
): string | null => {
  const secret =
    type === 'refresh' ? process.env.SECRET_REFRESH : process.env.SECRET_ACCESS
  if (secret) {
    return jwt.sign(
      {
        //Signing a token with 15 minutes or 1 month expiration:
        exp:
          Math.floor(Date.now() / 1000) +
          60 * 15 * (type === 'refresh' ? 4 * 24 * 30 : 1),
        data: userData
      },
      secret
    )
  }

  return null
}

export const generateTokens = (userData: PublicUserData): Token | null => {
  const accessToken = generateToken(userData, 'access')
  const refreshToken = generateToken(userData, 'refresh')
  if (accessToken && refreshToken) {
    return {
      accessToken,
      refreshToken
    }
  }

  return null
}

export const validateToken = (token: string, type: TokenType) => {
  const secret =
    type === 'refresh' ? process.env.SECRET_REFRESH : process.env.SECRET_ACCESS
  try {
    if (secret) {
      const decodedToken = jwt.verify(token, secret)
      if (typeof decodedToken !== 'string') {
        return decodedToken
      }
    }
    return null
  } catch (e) {
    return null
  }
}

export const setCookieRefreshToken = (res: NextApiResponse, token: string) => {
  try {
    res.setHeader('Set-Cookie', [
      cookie.serialize('refreshToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        //Token with 30 days of expiration:
        maxAge: 60 * 60 * 24 * 30,
        sameSite: 'strict',
        path: '/'
      })
    ])
  } catch (e) {
    console.log(e)
  }
}
