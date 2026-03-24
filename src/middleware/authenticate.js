import jwt from 'jsonwebtoken';

const authenticate = (req, res, next) => {
    const authHeader = req.get('authorization');

    if (!authHeader || !/^Bearer\s+/i.test(authHeader)) {
        return res.status(401).json({
            success: false,
            message: 'No token provided'
        })
    }

    

    const token = authHeader.replace(/^Bearer\s+/i, '').trim();

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'No token provided'
        })
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload;
        next();
    }catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Invalid or expired token'
        })
    }
}

export default authenticate;