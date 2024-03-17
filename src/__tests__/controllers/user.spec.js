// Import the necessary modules and functions
const { getUser } = require('../../controllers/user.controller');
const dbHelper = require('../../helpers/dbHelper');
import * as userTable from '../../db/d_user.query.js';
// Mock the dependencies
jest.mock('../../helpers/dbHelper');

describe('getUser function', () => {
    test('should return status 200 with message "Hello"', async () => {
        // Mock dbHelper.getConn to return a mock connection
        const mockConn = {
            release: jest.fn(),
        };
        dbHelper.getConn.mockResolvedValue(mockConn);

        // Mock dbHelper.performSqlOperation to return a mock user list
        const userList = ['user1', 'user2'];
        dbHelper.performSqlOperation.mockResolvedValue(userList);

        // Mock response object
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };

        // Call the getUser function
        await getUser({}, mockRes);

        // Assertions
        expect(dbHelper.getConn).toHaveBeenCalled();
        expect(dbHelper.performSqlOperation).toHaveBeenCalledWith(mockConn, null, userTable.getUser);
        expect(mockConn.release).toHaveBeenCalled();
        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.send).toHaveBeenCalledWith({ msg: "Ok" });
        expect(mockRes.status).not.toHaveBeenCalledWith(500);
    });
});