import express from 'express'
import {
  getRls,
  getAllRls,
  getRlsById,
  getRlsByData,
  addRls,
  editRls,
  deleteRls,
} from '../controllers/Rules.js'
import { verifyUser, adminOnly } from '../middleware/AuthUser.js'

const router = express.Router()

router.get('/get-rls', getRls)
router.get('/get-allrls', getAllRls)
router.get('/get-rlsbyid', verifyUser, getRlsById)
router.get('/get-rlsbydata', verifyUser, getRlsByData)
router.post('/add-rls', verifyUser, adminOnly, addRls)
router.post('/edit-rls', verifyUser, adminOnly, editRls)
router.post('/delete-rls', verifyUser, adminOnly, deleteRls)

export default router
