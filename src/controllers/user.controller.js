import responseWrapper from "../helpers/response.helper.js";
import * as dbHelper from "../helpers/dbHelper.js";
import * as userTable from "../db/d_user.query.js";

export async function getUser(req, res) {
    try {
        let conn = await dbHelper.getConn();
        try {
            let userList = await dbHelper.performSqlOperation(conn, null, userTable.getUser);
            conn.release();
            return res.status(200).send({msg : "Ok"});
        } catch (err) {
            conn.release();
            throw err
        }
    } catch (err) {
        return res.status(500);
        // return responseWrapper.server_error(res, err);
    }
}

export async function addUser(req, res) {
    let { name, email, age, weight, height } = req.body;
    try {
        let conn = await dbHelper.getTransactionConn();
        try {
            await dbHelper.performSqlOperation(conn, req.body, userTable.addUser);
            await dbHelper.commitTranAndRelConn(conn);
            return responseWrapper.ok(res, "user added successfully");
        } catch (err) {
            await dbHelper.rollbackAndThrowError(conn, err);
            throw err
        }
    } catch (err) {
        return responseWrapper.server_error(res, err);
    }
}

export async function updateUser(req, res) {
    let { user_id, age, weight, height } = req.body;
    try {
        let conn = await dbHelper.getTransactionConn();
        try {
            // let data = { User_id, age, weight, height };
            await dbHelper.performSqlOperation(conn, req.body, userTable.updateUser);
            await dbHelper.commitTranAndRelConn(conn);
            return responseWrapper.ok(res, "user updated successfully");
        } catch (err) {
            await dbHelper.rollbackAndThrowError(conn, err);
            throw err
        }
    } catch (err) {
        return responseWrapper.server_error(res, err);
    }
}

export async function deleteUser(req, res) {
    let { user_id } = req.body;
    try {
        let conn = await dbHelper.getTransactionConn();
        try {
            await dbHelper.performSqlOperation(conn, req.body, userTable.deleteUser);
            await dbHelper.commitTranAndRelConn(conn);
            return responseWrapper.ok(res, "user deleted successfully");
        } catch (err) {
            await dbHelper.rollbackAndThrowError(conn, err);
            throw err
        }
    } catch (err) {
        return responseWrapper.server_error(res, err);
    }
}