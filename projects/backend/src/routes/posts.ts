import { createPost, deletePost, getMyPost, getMyPosts, getPost, getPosts, updatePost } from '@import/controllers'
import { verifyToken } from '@import/middlewares'
import { Router } from 'express'

const router = Router()

router.get('/', getPosts)

router.get('/my-posts', verifyToken, getMyPosts)

router.get('/my-posts/:id', verifyToken, getMyPost)

router.get('/:id', getPost)

router.post('/', verifyToken, createPost)

router.put('/:id', verifyToken, updatePost)

router.delete('/:id', verifyToken, deletePost)

export default router
