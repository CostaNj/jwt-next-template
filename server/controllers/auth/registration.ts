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

export const registration = async (
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
  const password = validateBuilder(
    'password',
    data?.password,
    validator.isStrongPassword,
    'Please, enter strong password'
  )

  const validationErrors = getValidationErrors([email, password])

  if (validationErrors.length > 0) {
    return res.status(400).json({
      message: 'Validation error',
      validationErrors
    })
  }

  try {
    const user = await User.findOne({ where: { email: data?.email } })
    if (user) {
      return res
        .status(400)
        .json({ message: 'There is already a user with this email' })
    } else {
      const salt = bcrypt.genSaltSync(10)
      const hashPassword = await bcrypt.hash(data?.password, salt)
      const newUser = await User.create({
        email: data?.email,
        password: hashPassword
      })
      const publicUserData: PublicUserData = {
        id: newUser.getDataValue('id'),
        email: newUser.getDataValue('email')
      }
      const tokens = generateTokens(publicUserData)

      if (tokens) {
        const newRefreshToken = await Token.create({
          userId: newUser.getDataValue('id'),
          token: tokens.refreshToken,
          device: getUserDevice(req)
        })

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
    }
  } catch (error) {
    console.log(error)
    return res
      .status(400)
      .json({ message: 'Something went wrong, try again later' })
  }
}
