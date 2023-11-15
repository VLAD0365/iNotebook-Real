const jwt = require('jsonwebtoken');
const JWT_SECRET = 'DB0fN0M4N';

const fetchuser = (req, res, next)=>{
    //Get the User From the JWT Token and add id to req Object
    const token = req.header('auth-token')
    if(!token){
        res.status(401).send({error: "Please authentiction using a valid token"});
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next()
        
    } catch (error) {
        res.status(401).send({error: "Please authentiction using a valid token"})
    }
}


module.exports = fetchuser;