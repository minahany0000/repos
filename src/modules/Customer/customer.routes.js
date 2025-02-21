import express from 'express'
import * as CC from './customer.controller.js'


const Router = express.Router()

Router.post('/SignUp', CC.SignUp)
Router.post('/LogIn', CC.LogIn)

export default Router