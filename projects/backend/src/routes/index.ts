import { Router } from 'express'

import commentsRoute from './comments'
import postsRoute from './posts'
import usersRoute from './users'

const router = Router()

router.use('/comments', commentsRoute)
router.use('/posts', postsRoute)
router.use('/users', usersRoute)

export default router
