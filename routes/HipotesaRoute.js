import express from 'express'
import {
  getHpt,
  getHptById,
  addHpt,
  editHpt,
  deleteHpt,
} from '../controller/Hipotesa.js'
import { verifyUser, adminOnly } from '../middleware/AuthUser.js'

const router = express.Router()

router.get('/get-hpt', getHpt)
router.get('/get-hptbyid', getHptById)
router.post('/add-hpt', verifyUser, adminOnly, addHpt)
router.post('/edit-hpt', verifyUser, adminOnly, editHpt)
router.post('/delete-hpt', verifyUser, adminOnly, deleteHpt)

export default router
