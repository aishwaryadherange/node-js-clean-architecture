import responseWrapper from "../helpers/response.helper.js";

export const checkObjectLength = (properties) => (req, res, next) => {
    let error = []
    properties.forEach(element => {
        const property = req.body[element];
        if (!property || property.length <= 0) {
            error.push({
                "type": "field",
                "msg": `${element} lenght is 0`,
                "path": `${element}`,
                "location": "body"
            })
        }
    });
    if (error.length) {
        return responseWrapper.bad_request(res, error)
    }
    else {
        next();
    }
};