import express from 'express'
import { sendEmailMsgCtrl } from '../../controllers/emailMsg/sendEmail.Ctrl'
import authMiddleWare from '../../middlewares/authMiddleware'




const emailRoutes = express.Router()

emailRoutes.post('/', authMiddleWare, sendEmailMsgCtrl)



export default emailRoutes