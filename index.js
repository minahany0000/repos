import express from 'express'
import connection from './db/connectionDb.js'
import CustomerRouter from './src/modules/Customer/customer.routes.js'
import productRouter from './src/modules/product/product.routes.js'
import orderRouter from './src/modules/Order/order.routes.js'
const app = express()
const port = process.env.port || 3000

app.use(express.json())
connection.connect((err) => {
    if ((err)) {
        console.log(err)
    } else {
        console.log("Connected db success")
    }
})

app.use("/Customers", CustomerRouter)
app.use("/Products", productRouter)
app.use("/Order", orderRouter)
app.get('/', (req, res, next) => {
    res.status(200).json("Welcome to my simple project")
})


app.use('*', (req, res, n) => {
    res.status(404).json({ message: "Error 404 " })
})


app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})


