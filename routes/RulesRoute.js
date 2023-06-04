import express from 'express'
import {
  getRls,
  getRlsById,
  getRlsByData,
  addRls,
  editRls,
  deleteRls,
} from '../controller/Rules.js'
import { verifyUser, adminOnly } from '../middleware/AuthUser.js'

const router = express.Router()

router.get('/get-rls', getRls)
router.get('/get-rlsbyid', getRlsById)
router.get('/get-rlsbydata', getRlsByData)
router.post('/add-rls', verifyUser, adminOnly, addRls)
router.post('/edit-rls', verifyUser, adminOnly, editRls)
router.post('/delete-rls', verifyUser, adminOnly, deleteRls)

export default router
