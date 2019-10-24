import * as jwt from "jsonwebtoken";

export async function CheckAuth(req, res, next) {
    let accessToken = req.header.accessToken.split(' ')[1];

    let result = await jwt.verify(accessToken, process.env.SECRET);

    if (result) {
        next();
    } else {
        return res.status(400).json({
            message: 'Invalid Token'
        })
    }
};