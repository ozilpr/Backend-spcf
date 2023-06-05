import express from 'express'
import {
  getHpt,
  getHptById,
  addHpt,
  editHpt,
  deleteHpt,
} from '../controllers/Hipotesa.js'
import { verifyUser, adminOnly } from '../middleware/AuthUser.js'

const router = express.Router()

router.get('/get-hpt', verifyUser, getHpt)
router.get('/get-hptbyid', verifyUser, getHptById)
router.post('/add-hpt', verifyUser, adminOnly, addHpt)
router.post('/edit-hpt', verifyUser, adminOnly, editHpt)
router.post('/delete-hpt', verifyUser, adminOnly, deleteHpt)

export default router
