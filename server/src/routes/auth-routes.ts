import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  
  try {
    // Find the user by username
    const user = await User.findOne({ where: {username }});
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Generate a JWT token
    const secretKey = process.env.JWT_SECRET_KEY || 'default_secret'; 
    const token = jwt.sign({ id: user.id, username: user.username }, 
      secretKey, { expiresIn: '1h' });


    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error });
  }
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;
