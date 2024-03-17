import responseWrapper from './response.helper.js';
import { validationResult } from 'express-validator';

export default function validateRequestBody(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return responseWrapper.bad_request(res, errors.array(), "Invalid Parameters")
    }
    next();
}