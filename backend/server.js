import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
// import User from "./models/users.js";
import routes from "./routes/userRoutes.js";
import noteRoutes from "./routes/noteRoutes.js"
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js"
import path from "path"
dotenv.config();


const app = express();
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(express.json());
app.use(cors());
app.use("/api/users", routes);
app.use("/api/notes",noteRoutes);

// ---------------deployment code------------

const __dirname = path.resolve();
if(process.env.NODE_ENV==='production'){
  app.use(express.static(path.join(__dirname,'/frontend/build')));
  app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,'frontend','build','index.html'))
  })
}

// ---------------deployment code------------


app.use(notFound);
app.use(errorHandler);   

const URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 5000;


mongoose
  .connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`server running at port ${PORT}`))
  )
  .catch((err) => console.log(err));



















// import express from "express"
// import dotevn from "dotenv"
// import notes from "./data/notes.js"
// import connectDB from "./config/db.js"
// import userRroutes from "./routes/userRoutes.js"
// import cors from 'cors'
// import bodyParser from "body-parser"
// import { errorHandler, notFound } from "./middlewares/errorMiddleware.js"

// const app = express()
// dotevn.config();
// connectDB();
// app.use(express.json())

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json())
// app.use(cors());
// app.use("/api/users", userRroutes);
// app.use(notFound);
// app.use(errorHandler);   



// const PORT = process.env.PORT || 5000
// app.listen(PORT,()=>console.log(`server running on port ${PORT}`))
