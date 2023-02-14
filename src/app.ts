// import "regenerator-runtime/runtime";
import express,{ Application,Request,Response } from 'express';
import { config } from 'dotenv';
import routes from "./routes";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import handleError from "./middleware/errorHandler.middleware";
import cron from "node-cron";
import cors from "cors";
import notificationsJob from "./jobs/notificationsJob";
config();

const app: Application = express();
const port = process.env.PORT || 5000;

app.use(cors({credentials: true}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.use(cookieParser());


//API
app.use("/api/v1", routes);


app.get("/", async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).send({
        message: "MEDICINE TRACKER BACKEND",
    });
});

app.use(handleError);

// cron scheduler
cron.schedule(`* * * * *`, notificationsJob);


app.listen(port, () =>{
    console.log(`listening at http://localhost:${port}`)
} );


