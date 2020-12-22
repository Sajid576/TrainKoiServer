const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticate=(req, res, next) => {
    try{
        const token=req.headers.authorization.split(' ')[1];
        const decode=jwt.verify(token, process.env.JWT_SECRET)
        console.log(decode);
        req.user=decode;

        next();
    
    }catch(err){
        res.json({
            message:"Authentication failed"
        })
    }
}

module.exports=authenticate;