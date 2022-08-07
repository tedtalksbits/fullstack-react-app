import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if (authHeader) {
        //authHeader is a string separated by a space (" "). => ["Bearer", "token string"]
        //we want the token string, which is the item at index 1 in the array
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            //if theres an error
            if (err) {
                return res.status(403).json({
                    message: 'Invalid token',
                    error: true,
                    status: 403,
                });
            }

            // return user if no error
            req.user = user;
            next();
        });
    } else {
        return res.status(401).json({
            error: true,
            message: 'No token provided',
            status: 401,
        });
    }
};

export const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        //if id in token object === params id OR isAdmin is true then proceed aka call the next() function
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            return res.status(403).json({
                error: true,
                message: 'You are not authorized to perform this action',
                status: 403,
            });
        }
    });
};
export const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        //if user is admin continue aka call next()
        if (req.user.isAdmin) {
            next();
        } else {
            return res.status(403).json({
                error: true,
                message: 'You are not authorized to perform this action',
                status: 403,
            });
        }
    });
};
