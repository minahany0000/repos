import connection from "../../../db/connectionDb.js";



export const AddProduct = (req, res, next) => {
    const { name, category, unit_price } = req.body
    const q1 = `INSERT INTO product (name, category, unit_price) VALUES ("${name}","${category}","${unit_price}")`
    connection.execute(q1, (err, result) => {
        if (err) {
            return res.status(400).json({ message: "Add all dataaaaa", error: err })
        } else {
            const newProduct = {
                name, category, unit_price
            }
            return res.status(201).json({ message: "Added", newProduct })
        }
    })

}
export const total_revenue = (req, res, next) => {
    const q = `
 SELECT 
    p.category, 
    SUM(oi.quantity * oi.unit_price) AS total_revenue
FROM orderitems oi
JOIN product p ON oi.productId = p.id
GROUP BY p.category
ORDER BY total_revenue DESC;
 `
    connection.execute(q, (error, result) => {
        res.status(200).json(result)

    })


}
export const totalSold = (req, res, next) => {
    const q = `
SELECT 
    p.name AS product_name, 
    SUM(oi.quantity) AS total_items_sold
FROM orderitems oi
JOIN product p ON oi.productId = p.id
GROUP BY p.id, p.name
ORDER BY total_items_sold DESC;
 `
    connection.execute(q, (error, result) => {
        res.status(200).json(result)

    })


}