import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import * as userRepository from '../repositories/userRepository.js'

const SALT_ROUNDS = 12;

const generateToken = (userId) => {
    return jwt.sign(
        { userId },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );
};

export const register = async ({ name, email, password }) => {
    const exisiting = await userRepository.findByEmail(email);
    if (exisiting) {
        throw new Error('EMAIL_EXISTS');
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await userRepository.createUser({ name, email, password: hashedPassword});
    const token = generateToken(user.id);

    return { user, token };
}

export const login = async ({ email, password }) => {
    const user = await userRepository.findByEmail(email);
    if (!user) {
        throw new Error('INVALID_CREDENTIALS');
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        throw new Error('INVALID_CREDENTIALS');
    }

    const token = generateToken(user.id);
    const {password: _, ...userWithoutPassword } = user
    return { user: userWithoutPassword, token}
}