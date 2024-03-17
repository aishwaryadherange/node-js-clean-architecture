import responseWrapper from "../helpers/response.helper.js";
import sequelize from "../models/index.js";

export async function configDB(req, res) {
    try {
        await sequelize.sync({ alter: true });
        responseWrapper.accepted(res, "Sync DB")
    }
    catch (err) {
        responseWrapper.server_error(res, err)
    }
}