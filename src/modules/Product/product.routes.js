import express from 'express'
import * as PC from './product.controller.js'





const Router = express.Router()

Router.post("/Add" , PC.AddProduct)
Router.get("/GetRev" , PC.total_revenue)
Router.get("/totalSold" , PC.totalSold)


export default Router;