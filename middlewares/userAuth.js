require("dotenv").config();
const jwt = require("jsonwebtoken");
const { User } = require("../models/userModel.js");



function createToken(cookiePayload, maxAge) {
	const token = jwt.sign(cookiePayload, process.env.JWT_SECRET, { expiresIn: maxAge });
	return token;
}



const isLoggedin = async function (req, res, next) {
	let token;
        if(
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    )
    {
        try {
            
            token = req.headers.authorization.split(" ")[1];
            console.log("token: " + token);
			const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

		const user = await User.findById(decodedToken._id);
		if (!user) throw new Error("Could'nt find User");
		
		// Save user info to locals, and move to next middleware
		res.locals.user = { fac: decodedToken.fac, ...user };
		next();
        } 
    

	 catch (err) {
		console.error(err);
		res.status(400).json({ access: false, msg: err.message });
	}
}
if(!token) {
	res.status(401);
	throw new Error("Not authorized, no token");
}
};

module.exports = { createToken, isLoggedin };
