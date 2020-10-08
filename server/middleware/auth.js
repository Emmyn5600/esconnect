/* eslint-disable node/no-unsupported-features/es-syntax */
import { decodeToken } from '../utils/tokenGenerator';

const verifyToken = async(req, res, next) => {
    const token = req.headers.authorization
    try {
        if(!token){
            res.status(401).json({
                status: 401,
                error: 'Not Authenticated'
            })
        }
        const user = await decodeToken(token)
        req.user = user

        next()
    }catch(err) {
        res.status(401).json({
            status: 401,
            error: err.message
        })
    }
}

export default verifyToken
