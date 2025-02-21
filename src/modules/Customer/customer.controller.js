import connection from "../../../db/connectionDb.js"

//===================Add customer==============
export const SignUp = (req, res, next) => {
    const { firstName, lastName, email, phone } = req.body
    const q1 = `SELECT email from customer where email = "${email}"`
    connection.execute(q1, (err, result) => {
        if (err) {
            return res.status(400).json({ mssg: "An error has been occured " })
        }
        if (result.length) {
            return res.status(400).json({ message: "Chane Your email" })
        }

        const q2 = `INSERT INTO customer (firstName,lastName,email,phone) VALUES ('${firstName}','${lastName}','${email}','${phone}')`
        connection.execute(q2, (err, result) => {
            if (err)
                return res.status(400).json({ mssg: "An error has been occured 2", err })
            if (result.affectedRows) {
                const newUser = {
                    firstName,
                    lastName,
                    email,
                    phone
                };
                return res.status(201).json({ message: "Done", result: newUser })
            }

        })
    })
}
//===================LogIn customer==============
export const LogIn = (req, res, next) => {
    const { email } = req.body
    const q1 = `SELECT email from customer where email = "${email}"`
    connection.execute(q1, (err, result) => {
        if (err) {
            return res.status(400).json({ mssg: "An error has been occured " })
        }
        if (!result.length) {
            return res.status(400).json({ message: "Chane Your email" })
        }
        const user = result[0];
        return res.status(200).json({ message: "Login successful", user });
    })
}