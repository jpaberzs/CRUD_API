import { IncomingMessage } from 'http'
import { User } from '../models/user'

export const parseBody = (req: IncomingMessage): Promise<User> => {
  return new Promise((resolve, reject) => {
    let body = ''
    req.on('data', (chunk) => {
      body += chunk
    })

    req.on('end', () => {
      try {
        resolve(JSON.parse(body))
      } catch (error) {
        reject(error)
      }
    })

    req.on('error', (err) => {
      reject(err)
    })
  })
}
