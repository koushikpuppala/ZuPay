import { createComment, deleteComment, getComments } from '@import/controllers'
import { verifyToken } from '@import/middlewares'
import { Router } from 'express'

const router = Router()

router.get('/:id', getComments)

router.post('/:id', verifyToken, createComment)

router.delete('/:id', verifyToken, deleteComment)

export default router
