
import connection from "../../../db/connectionDb.js";
export const createOrder = (req, res) => {
    const { customerId, items } = req.body;
    const q1 = `INSERT INTO \`order\` (customerId, orderDate) VALUES (?, NOW())`;

    connection.execute(q1, [customerId], (err, result) => {
        if (err) return res.status(500).json({ message: "Error creating order", error: err });

        const orderId = result.insertId;
        const values = items.map(item => [orderId, item.productId, item.quantity, item.unit_price]);
        
        const q2 = `INSERT INTO orderitems (orderId, productId, quantity, unit_price) VALUES ?`;

        connection.query(q2, [values], (err) => {
            if (err) return res.status(500).json({ message: "Error adding items", error: err });
            res.status(201).json({ message: "Order created successfully", orderId });
        });
    });
};


export const getAverageOrderValue = (req, res) => {
    const q = `SELECT AVG(totalAmount) as averageOrderValue FROM (
                SELECT orderId, SUM(quantity * unit_price) AS totalAmount 
                FROM orderitems GROUP BY orderId) AS OrderTotals`;
    
    connection.query(q, (err, result) => {
        if (err) return res.status(500).json({ message: "Error fetching average", error: err });
        res.json({ averageOrderValue: result[0].averageOrderValue });
    });
};





export const getCustomersWithoutOrders = (req, res) => {
    const q = `SELECT * FROM customer WHERE id NOT IN (SELECT DISTINCT customerId FROM \`order\`)`;
    
    connection.query(q, (err, result) => {
        if (err) return res.status(500).json({ message: "Error fetching customers", error: err });
        res.json({ customers: result });
    });
};





export const getTopCustomerByItems = (req, res) => {
    const q = `SELECT customer.id, customer.firstName, customer.lastName, SUM(orderitems.quantity) AS totalItems
               FROM customer
               JOIN \`order\` ON customer.id = order.customerId
               JOIN orderitems ON order.id = orderitems.orderId
               GROUP BY customer.id
               ORDER BY totalItems DESC LIMIT 1`;
    
    connection.query(q, (err, result) => {
        if (err) return res.status(500).json({ message: "Error fetching top customer", error: err });
        res.json({ topCustomer: result[0] });
    });
};

export const getTopSpendingCustomers = (req, res) => {
    const q = `SELECT customer.id, customer.firstName, customer.lastName, SUM(orderitems.quantity * orderitems.unit_price) AS totalSpent
               FROM customer
               JOIN \`order\` ON customer.id = order.customerId
               JOIN orderitems ON order.id = orderitems.orderId
               GROUP BY customer.id
               ORDER BY totalSpent DESC LIMIT 10`;

    connection.query(q, (err, result) => {
        if (err) return res.status(500).json({ message: "Error fetching top customers", error: err });
        res.json({ topCustomers: result });
    });
};


export const getFrequentCustomers = (req, res) => {
    const q = `SELECT customer.id, customer.firstName, customer.lastName, COUNT(order.id) AS orderCount
               FROM customer
               JOIN \`order\` ON customer.id = order.customerId
               GROUP BY customer.id
               HAVING orderCount >= 5`;
    
    connection.query(q, (err, result) => {
        if (err) return res.status(500).json({ message: "Error fetching frequent customers", error: err });
        res.json({ frequentCustomers: result });
    });
};


export const getPercentageMultipleOrders = (req, res) => {
    const q = `SELECT 
                    (COUNT(DISTINCT customerId) / (SELECT COUNT(*) FROM customer) * 100) AS percentage
               FROM \`order\`
               GROUP BY customerId
               HAVING COUNT(id) > 1`;

    connection.query(q, (err, result) => {
        if (err) return res.status(500).json({ message: "Error calculating percentage", error: err });
        res.json({ percentage: result[0]?.percentage || 0 });
    });
};

export const getFirstCustomerOrder = (req, res) => {
    const q = `SELECT customer.id, customer.firstName, customer.lastName, order.orderDate
               FROM customer
               JOIN \`order\` ON customer.id = order.customerId
               ORDER BY order.orderDate ASC LIMIT 1`;

    connection.query(q, (err, result) => {
        if (err) return res.status(500).json({ message: "Error fetching first order", error: err });
        res.json({ firstCustomerOrder: result[0] });
    });
};

