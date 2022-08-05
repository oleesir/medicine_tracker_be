import express,{Application,Request,Response} from 'express';

const app: Application = express();
const port = process.env.PORT || 5000;


app.get("/", async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).send({
        message: "MEDICINE TRACKER BACKEND",
    });
});

app.listen(port, () => console.log(`listening at http://localhost:${port}`));