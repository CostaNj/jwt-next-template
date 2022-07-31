import { NextApiRequest, NextApiResponse } from 'next'

import { RegistrationRes } from '../../../dtos/auth'
import { Error } from '../../../dtos/error'
import { PublicUserData } from '../../../dtos/user'
import { Token } from '../../models/token'
import { User } from '../../models/user'
import { generateToken, validateToken } from '../../services/token'
import { getUserDevice } from '../../utils/user-agent-parser'

export const refresh = async (
  req: NextApiRequest,
  res: NextApiResponse<RegistrationRes | Error>
) => {
  try {
    const { refreshToken } = req.cookies
    const device = getUserDevice(req)

    if (!refreshToken) {
      return res.status(400).json({
        message: 'Unauthorized 1'
      })
    }

    const validDecodedToken = validateToken(refreshToken, 'refresh')
    const token = await Token.findOne({
      where: { token: refreshToken, device }
    })

    if (validDecodedToken && token) {
      const userData: PublicUserData = validDecodedToken?.data
      const user = await User.findOne({ where: { id: userData.id } })
      if (user) {
        const publicUserData: PublicUserData = {
          id: user.getDataValue('id'),
          email: user.getDataValue('email')
        }
        const accessToken = generateToken(publicUserData, 'access')

        if (accessToken) {
          return res.status(200).json({
            user: publicUserData,
            accessToken
          })
        } else {
          return res.status(400).json({
            message: 'Unauthorized 2'
          })
        }
      } else {
        return res.status(400).json({
          message: 'Unauthorized 3'
        })
      }
    } else {
      return res.status(400).json({
        message: 'Unauthorized 4'
      })
    }
  } catch (e) {
    console.log(e)
    return res.status(400).json({
      message: 'Unauthorized 5'
    })
  }
}
