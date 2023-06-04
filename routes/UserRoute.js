import express from 'express'
import {
  getUser,
  getUserById,
  getUserByKodeReg,
  getUserByUuid,
  addUser,
  editUser,
  deleteUser,
} from '../controller/User.js'
import { verifyUser, adminOnly } from '../middleware/AuthUser.js'

const router = express.Router()

router.get('/get-user', verifyUser, adminOnly, getUser)
router.get('/get-userbyid', getUserById)
router.get('/get-userbykodereg', getUserByKodeReg)
router.get('/get-userbyuuid', getUserByUuid)
router.post('/add-user', verifyUser, adminOnly, addUser)
router.post('/edit-user', verifyUser, adminOnly, editUser)
router.post('/delete-user', verifyUser, adminOnly, deleteUser)

export default router
