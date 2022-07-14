import bcrypt from 'bcrypt'
import { NextApiRequest, NextApiResponse } from "next"
import { RegistrationReq, RegistrationRes } from '../../../dtos/auth'
import { User } from '../../models/user'

export const registration = async (req: NextApiRequest, res: NextApiResponse<RegistrationRes>) => {

  const data: RegistrationReq = req.body

  try {
    const user = await User.findOne({ where: { email: data?.email } });
    if(user) {
      res.status(400).json({ message: 'There is already a user with this email' })
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hashPassword = await bcrypt.hash(data?.password, salt)
      const newUser = await User.create({ email: data?.email, password: hashPassword })

      res.status(200).json({
        user: {
          id: newUser.getDataValue('id'),
          email: newUser.getDataValue('email')
        },
        accessToken: '123',
        refreshToken: '123'
      })
    }
  } catch (error) {
    res.status(400).json({ message: 'Something wrong' })
  }
}
