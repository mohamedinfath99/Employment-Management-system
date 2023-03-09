import express from 'express';
import cors from "cors";
import usersRoute from './routes/userRoutes.js';


const app = express();

app.use(express.json());


app.use(cors())
app.use(express.json())


app.use("/api/v1/users", usersRoute)


app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMesage = err.message || "Something went to wrong";

    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMesage,
        stack: err.stack
    })
    next()
})



export default app;