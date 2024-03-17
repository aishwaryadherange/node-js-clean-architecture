import { body } from 'express-validator';

export const validateAddUser = [
    body('name').notEmpty().withMessage('name is required'),
    body('email').isEmail().withMessage('valid email required'),
    body('password').notEmpty().withMessage('password is required'),
    body('age').notEmpty().withMessage('age Def is required')
];

export const validateUpdateUser = [
    body('age').notEmpty().withMessage('age is required'),
    body('height').notEmpty().withMessage('height is required'),
    body('weight').notEmpty().withMessage('weight is required'),
];

export const validateDeleteUser = [
    body('user_id').notEmpty().withMessage('user_id is required'),
];