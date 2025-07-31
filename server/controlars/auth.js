import {db} from '../db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

/* db.query('SELECT 1 + 1 AS solution')
  .then(([rows]) => {
    console.log('Test query result:', rows);
  })
  .catch((err) => {
    console.error('Test query failed:', err);
  }); */
export const register = async (req, res) => {
    try {
        // Check existing user
        const q1 = 'SELECT * FROM "ameyzingengineer"."user" WHERE "useremail" = $1 OR "username" = $2';
        const { rows: existingUser } = await db.query(q1, [req.body.email, req.body.username]);
    
        if (existingUser.length) {
          return res.status(409).json({message: 'User already exists!'});
        }

        //hash password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        //register user
        const q2 = 'INSERT INTO "ameyzingengineer"."user"("username", "useremail", "userpassword") VALUES ($1, $2, $3)';
        const { rows: result } = await db.query(q2, [req.body.username, req.body.email, hash]);
        return res.status(200).json('User has been created.');
    } catch (err) {
        console.error(err);
        return res.status(500).json(err);
    }
};

export const login = async (req, res) => {
    try {
        // Check if user exists
        const q = 'SELECT * FROM "ameyzingengineer"."user" WHERE "useremail" = $1';
        const { rows: user } = await db.query(q, [req.body.email]);

        if (user.length === 0) {
            return res.status(404).json({ message: 'User not found!' });
        }

        // Verify password
        const isPasswordValid = bcrypt.compareSync(req.body.password, user[0].userpassword);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials!' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user[0].iduser }, process.env.JWT_SECRET, { expiresIn: '1h' });
        // Set token in cookie (optional)
        res.cookie('access_token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        }).status(200).json(user[0]);
        // Return success response with token
        //return res.status(200).json({ message: 'Login successful!', token });
    } catch (err) {
        console.error(err);
        return res.status(500).json(err);
    }
}

export const logout = (req, res) => {
    res.clearCookie('access_token', { 
        sameSite: 'none',
        secure: true 
    }).status(200).json({ message: 'User has been logged out.'});
}