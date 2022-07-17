import { NextApiRequest } from 'next'
import { parseUserAgent } from "react-device-detect"

export const getUserDevice = (req: NextApiRequest): string | null => {
  const { os, browser } = parseUserAgent(req.headers["user-agent"])
  if(os && browser) {
    return `${os?.name} ${os?.version}, ${browser?.name}`
  }

  return null
}