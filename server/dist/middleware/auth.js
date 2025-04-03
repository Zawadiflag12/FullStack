import jwt from 'jsonwebtoken';
export const authenticateToken = (req, res, next) => {
    // TODO: verify the token exists and add the user data to the request object
    const authHeader = req.headers.authorization;
    // Check if the authorization header is present
    if (!authHeader) {
        return res.status(401).json({ message: 'Access Denied: No Token Provided' });
    }
    // Extract the token from the authorization header
    const token = authHeader.split(' ')[1];
    // Get the secret key from the environment variables
    const secretKey = process.env.JWT_SECRET_KEY;
    if (!secretKey) {
        console.error('JWT secret key is missing from environment variables.');
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    // Verify the JWT token
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.sendStatus(403); // Send forbidden status if the token is invalid
        }
        // Attach the user information to the request object
        req.user = decoded;
        next(); // Call the next middleware function
        return; // Explicitly return after calling next()
    });
    return; // Ensure all code paths return a value
};
