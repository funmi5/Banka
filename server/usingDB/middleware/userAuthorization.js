import usersVerification from '../auth/auth';

const Verification = {
    checkUser(req, res, next) {
        const token = req.headers.authorization.split(' ')[1];
        const decode = usersVerification.verifyToken(token);

        req.user = decode;

        return next();
    },

    checkAdmin(req, res, next) {
        const token = req.headers.authorization.split(' ')[1];
        const decode = usersVerification.verifyToken(token);

        req.user = decode;        

        if(!req.user.rows[0].isadmin) {
            return res.status(401).send({
                status: res.statusCode,
                error: 'Unauthorized'
        });
    }
        
        return next();
        
    },

    checkCashier(req, res, next) {
        const token = req.headers.authorization.split(' ')[1];
        const decode = usersVerification.verifyToken(token);
        
        req.user = decode;
        
        if(req.user.rows[0].type !== 'cashier') {
            return res.status(401).json({
                status: res.statusCode,
                error: 'Unauthorized'
            });
        }
                
        return next();
                
    }


}


export default Verification;
