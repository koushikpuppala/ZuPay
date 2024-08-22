import { createUser, deleteUser, getUser, getUsers, updateUser } from '@import/controllers'
import { verifyToken } from '@import/middlewares'
import { Router } from 'express'

const router = Router()

router.get('/', getUsers)

router.get('/:id', getUser)

router.post('/', verifyToken, createUser)

router.put('/:id', verifyToken, updateUser)

router.delete('/:id', verifyToken, deleteUser)

export default router
