import moment from 'moment';
import logger from '../helpers/logger.js'
import cryptLib from '@skavinvarnan/cryptlib';
import { config } from 'dotenv'
config({ path: `.env.${process.env.NODE_ENV}` });

const responseWrapper = {
    ok: (res, data = null, message = 'ok') => {
        return res.status(200).json(_formatResponse(true, message, null, data))
    },
    created: (res, data = null, message = 'created') => {
        return res.status(201).json(_formatResponse(true, message, null, data))
    },
    accepted: (res, data = null, message = 'accepted') => {
        return res.status(202).json(_formatResponse(true, message, null, data))
    },
    bad_request: (res, data = null, message = 'bad_request') => {
        return res.status(400).json(_formatResponse(false, message, data, null))
    },
    unauthorised: (res, data = null, message = 'unauthorised') => {
        return res.status(401).json(_formatResponse(false, message, data, null))
    },
    not_found: (res, data = null, message = 'not_found') => {
        return res.status(404).json(_formatResponse(false, message, data, null))
    },
    server_error: (res, data = null, message = 'server_error') => {
        console.log(data)
        if (process.env.NODE_ENV == 'dev' || process.env.NODE_ENV == 'uat' || process.env.NODE_ENV == 'prod') {
            logger.error(data)
        }

        let error;

        if (data.message != null) {
            error = data.message
        }
        else {
            error = data
        }
        return res.status(500).json(_formatResponse(false, message, data.message, null))
    }
};

const _formatResponse = (success, message, error = null, data = null, pages = null) => {
    let allData = {
        success,
        message,
        timestamp: moment(),
        error,
        pages,
        data,

    }
    let dataEncrypt = cryptLib.encryptPlainTextWithRandomIV(JSON.stringify(allData), process.env.CRYPT_LIB_KEY)
    let dataReturn = {}
    if (process.env.NODE_ENV != 'prod') {
        dataReturn = {
            data: dataEncrypt,
            dataDecrypt: allData
        };
    } else {
        dataReturn = {
            data: dataEncrypt
        }
    }
    return dataReturn
};

export default responseWrapper;
