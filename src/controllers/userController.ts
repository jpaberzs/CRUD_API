import { IncomingMessage, ServerResponse } from 'http'
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../services/userService'
import { parseBody } from '../utils/parseBody'

export const userController = async (
  req: IncomingMessage,
  res: ServerResponse
) => {
  const urlParts = req.url?.split('/')
  const method = req.method
  const id = urlParts ? urlParts[2] : null

  if (urlParts && urlParts[1] === 'users') {
    switch (method) {
      case 'POST':
        const body = await parseBody(req)
        const newUser = createUser(body.name, body.email)
        res.writeHead(201, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(newUser))
        break

      case 'GET':
        if (id) {
          const user = getUserById(id)
          if (user) {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(user))
          } else {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'User not found' }))
          }
        } else {
          const allUsers = getUsers()
          res.writeHead(200, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify(allUsers))
        }
        break

      case 'PUT':
        if (id) {
          const updateBody = await parseBody(req)
          const updatedUser = updateUser(id, updateBody.name, updateBody.email)
          if (updatedUser) {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(updatedUser))
          } else {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'User not found' }))
          }
        }
        break

      case 'DELETE':
        if (id) {
          const isDeleted = deleteUser(id)
          if (isDeleted) {
            res.writeHead(204)
            res.end()
          } else {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'User not found' }))
          }
        }
        break

      default:
        res.writeHead(405, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Method not allowed' }))
        break
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ message: 'Not found' }))
  }
}
