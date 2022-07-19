import bcrypt from 'bcrypt'
import cookie from 'cookie'
import { NextApiRequest, NextApiResponse } from 'next'

import { RegistrationReq, RegistrationRes } from '../../../dtos/auth'
import { Error } from '../../../dtos/error'
import { PublicUserData } from '../../../dtos/user'
import { Token } from '../../models/token'
import { User } from '../../models/user'
import { generateTokens } from '../../services/token'
import { getUserDevice } from '../../utils/user-agent-parser'

export const login = async (
  req: NextApiRequest,
  res: NextApiResponse<RegistrationRes | Error>
) => {
  // TODO: validation
  const data: RegistrationReq = req.body

  try {
    const user = await User.findOne({ where: { email: data?.email } })
    if (user) {
      const isEqualPassword = await bcrypt.compare(data?.password.toString(), user.getDataValue('password'))
      if(isEqualPassword) {
        const publicUserData: PublicUserData = {
          id: user.getDataValue('id'),
          email: user.getDataValue('email')
        }
        const tokens = generateTokens(publicUserData)

        if (tokens) {
          const device = getUserDevice(req)

          const newTokenData = {
            userId: user.getDataValue('id'),
            token: tokens.refreshToken,
            device
          }
          const [ token, created ] = await Token.findOrCreate({
            where: {
              userId: user.getDataValue('id'),
              device
            },
            defaults: newTokenData
          })

          if(!created) {
            await token.set(newTokenData)
          }

          res.setHeader('Set-Cookie', [
            cookie.serialize(
              'refreshToken',
              tokens.refreshToken,
              {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                //Token with 30 days of expiration:
                maxAge: 60 * 60 * 24 * 30,
                sameSite: 'strict',
                path: '/'
              }
            )
          ])

          res.status(200).json({
            user: publicUserData,
            accessToken: tokens.accessToken
          })
        } else {
          console.log("Can't generate tokens")
          res
            .status(400)
            .json({ message: 'Something went wrong, try again later' })
        }
      } else {
        res
          .status(400)
          .json({ message: 'Wrong password' })
      }
    } else {
      res
        .status(400)
        .json({ message: 'There is no user with this email' })
    }
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: 'Something went wrong, try again later' })
  }
}
