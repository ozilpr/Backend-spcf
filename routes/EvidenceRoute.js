import express from 'express'
import {
  getEvd,
  getEvdById,
  addEvd,
  editEvd,
  deleteEvd,
  restoreEvd,
} from '../controller/Evidence.js'
import { verifyUser, adminOnly } from '../middleware/AuthUser.js'

const router = express.Router()

router.get('/get-evd', getEvd)
router.get('/get-evdbyid', getEvdById)
router.post('/add-evd', verifyUser, adminOnly, addEvd)
router.post('/edit-evd', verifyUser, adminOnly, editEvd)
router.post('/delete-evd', verifyUser, adminOnly, deleteEvd)
router.post('/restore-evd', verifyUser, adminOnly, restoreEvd)

export default router
