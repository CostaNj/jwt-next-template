import type { NextApiRequest, NextApiResponse } from 'next'
import { RegistrationReq, RegistrationRes } from '../../../dtos/auth'

const timer = async (value: number) => {
  return await new Promise((resolve, reject): void => {
    setTimeout(() => resolve('result'), value * 1000)
  })
}

const handler = async (req: NextApiRequest, res: NextApiResponse<RegistrationRes>) => {

  const data: RegistrationReq = req.body

  const test = await timer(2)

  res.status(200).json({
    user: {
      id: 1,
      email: data.email
    },
    accessToken: '123',
    refreshToken: '123'
  })
}

export default handler