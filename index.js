import express from "express" ;
import bodyParser from "body-parser";
import cors from "cors" ;
import morgan from "morgan";
import path from "path"
import {fileURLToPath} from "url"
import { configDotenv } from "dotenv";
import { DBConnection } from "./Config/DbConnection.js";
import { globalError } from "./Middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";

import authRouter from "./Router/authRouter.js"
import monothesimBlogRouter from "./Router/monothesimBlogRouter.js" 
import PrayerRouter from "./Router/PrayerRouter.js"
import CertificateRouter from "./Router/CertificateRouter.js"
import zakatRouter from "./Router/zakatRouter.js"
import fastingRouter from "./Router/fastingRouter.js"
import haijRouter from "./Router/haijRouter.js"
import bookRouter from "./Router/bookRouter.js"
import VideoRouter from "./Router/VideoRouter.js"
import LifeRouter from "./Router/LifeRouter.js";
import NewsRouter from "./Router/NewsRouter.js"
import ProgramRouter from "./Router/ProgramRouter.js"

configDotenv({path : "config/config.env"})
const app = express() ;
DBConnection();
app.use(cors());

// app.use(bodyParser.json({ limit: '10gb' })); // زيادة الحجم
// app.use(bodyParser.urlencoded({ limit: '10gb', extended: true }));
const PORT = process.env.PORT || 2000 ;
const __filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(__filename);
app.use(express.static('public'));
app.use('/images', express.static(path.join(dirname, 'images')));
app.use('/uploads', express.static('uploads'));



app.use(cookieParser()) 
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true }));
if(process.env.NODE_ENV == "development"){
    app.use(morgan("dev")) 
    console.log("Mode : Development")
}else if(process.env.NODE_ENV == "production"){
  app.use(morgan("dev"))
    console.log("Mode : Production")  
}  

app.use("/api/auth/", authRouter)
app.use("/api/monotheismBlog/", monothesimBlogRouter)
app.use("/api/prayerBlog/", PrayerRouter)
app.use("/api/certificateBlog/", CertificateRouter)
app.use("/api/zakatBlog/", zakatRouter)
app.use("/api/fastingBlog/", fastingRouter)
app.use("/api/haijBlog/", haijRouter)
app.use("/api/faithBook/", bookRouter)
app.use("/api/faithVideo/", VideoRouter)
app.use("/api/lifeBlogs/", LifeRouter)
app.use("/api/news/", NewsRouter)
app.use("/api/programs/", ProgramRouter)


//global error Middleware 
app.use(globalError);


app.listen(PORT ,async ()=>{
    console.log(`server is running on port ${PORT} ! `)
})
