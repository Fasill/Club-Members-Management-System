import jwt from 'jsonwebtoken';

const maxAge = 300;
const secretKey = '312';

export const validateTokenMiddleware = (req, res, next) => {
  var { token } = req.query;
  if (token === ''||token === undefined){
    var {token} = req.body  
  }

  if (!token) {
    return res.status(401).json({ error: 'Token is missing' });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, secretKey);
    
    // If the token is valid, you can access the decoded data in 'decoded'
    req.userId = decoded.id; // You can store the user ID in the request object for future use
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

export const validateToken = (req, res) => {
  var { token } = req.query;
  if (token === ''||token === undefined){
    var {token} = req.body  
  }

  if (!token) {
    return res.status(401).json({ error: 'Token is missing' });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, secretKey);
    
    // If the token is valid, you can access the decoded data in 'decoded'
    req.userId = decoded.id; // You can store the user ID in the request object for future use
    return res.status(401)
    
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
