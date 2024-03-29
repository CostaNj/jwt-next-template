import bcrypt from 'bcrypt'
import { NextApiRequest, NextApiResponse } from 'next'
import validator from 'validator'

import { RegistrationReq, RegistrationRes } from '../../../dtos/auth'
import { Error } from '../../../dtos/error'
import { PublicUserData } from '../../../dtos/user'
import { Token } from '../../models/token'
import { User } from '../../models/user'
import { generateTokens, setCookieRefreshToken } from '../../services/token'
import { getUserDevice } from '../../utils/user-agent-parser'
import { getValidationErrors, validateBuilder } from '../../utils/validation'

export const login = async (
  req: NextApiRequest,
  res: NextApiResponse<RegistrationRes | Error>
) => {
  const data: RegistrationReq = req.body

  const email = validateBuilder(
    'email',
    data?.email,
    validator.isEmail,
    'Please, enter correct email'
  )

  const validationErrors = getValidationErrors([email])

  if (validationErrors.length > 0) {
    return res.status(400).json({
      message: 'Validation error',
      validationErrors
    })
  }

  try {
    const user = await User.findOne({ where: { email: data?.email } })
    if (user) {
      const isEqualPassword = await bcrypt.compare(
        data?.password.toString(),
        user.getDataValue('password')
      )
      if (isEqualPassword) {
        const publicUserData: PublicUserData = {
          id: user.getDataValue('id'),
          email: user.getDataValue('email')
        }
        const tokens = generateTokens(publicUserData)

        if (tokens) {
          const device = getUserDevice(req)

          const [token, created] = await Token.findOrCreate({
            where: {
              userId: user.getDataValue('id'),
              device
            },
            defaults: {
              userId: user.getDataValue('id'),
              token: tokens.refreshToken,
              device
            }
          })

          if (!created) {
            await token.update({ token: tokens.refreshToken })
          }

          // TODO: Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
          setCookieRefreshToken(res, tokens.refreshToken)

          return res.status(200).json({
            user: publicUserData,
            accessToken: tokens.accessToken
          })
        } else {
          console.log("Can't generate tokens")
          return res
            .status(400)
            .json({ message: 'Something went wrong, try again later' })
        }
      } else {
        return res.status(400).json({ message: 'Wrong password' })
      }
    } else {
      return res
        .status(400)
        .json({ message: 'There is no user with this email' })
    }
  } catch (error) {
    console.log(error)
    return res
      .status(400)
      .json({ message: 'Something went wrong, try again later' })
  }
}
