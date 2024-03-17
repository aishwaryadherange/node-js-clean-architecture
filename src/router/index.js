import userRouter from './user/user.router.js';

function index(app) {
    const base = "/api-v1"
    app.use(base + '/user', userRouter);
}

export default index