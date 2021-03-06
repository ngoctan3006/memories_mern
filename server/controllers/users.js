import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/user.js';

dotenv.config();

export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ message: "User doesn't exist." });
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        const token = jwt.sign(
            {
                email: existingUser.email,
                id: existingUser._id
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({
            result: existingUser,
            token
        });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong.' });
    }
};

export const signup = async (req, res) => {
    const { email, password, comfirmPassword, firstName, lastName } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exist.' });
        }

        if (password !== comfirmPassword) {
            return res.status(400).json({ message: "Passwords don't match." });
        }

        const hasedPassword = await bcrypt.hash(password, 12);
        const result = await User.create({
            email,
            password: hasedPassword,
            name: `${firstName} ${lastName}`
        });
        const token = jwt.sign(
            {
                email: result.email,
                id: result._id
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        res.status(201).json({ result, token });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong.' });
    }
};
