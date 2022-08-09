import express,{Application,Request,Response} from 'express';
import routes from "./routes";
import cookieParser from "cookie-parser";
import handleError from "./middleware/errorHandler.middleware";

const app: Application = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use(cookieParser());

//API
app.use("/api/v1", routes);



app.get("/", async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).send({
        message: "MEDICINE TRACKER BACKEND",
    });
});

app.use(handleError);

app.listen(port, () => console.log(`listening at http://localhost:${port}`));