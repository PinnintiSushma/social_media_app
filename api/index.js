import express from "express"
import mysql from "mysql"
import cors from "cors"
import multer from "multer"
const app=express()

import authRoutes from "./routes/auth.js";
import commentRoutes from "./routes/comments.js";
import postRoutes from "./routes/posts.js";
import cookieParser from "cookie-parser"
import likeRoutes from "./routes/likes.js";
import userRoutes from "./routes/users.js";
import relationshipRoutes from "./routes/relationships.js";

app.use(express.json())
app.use(cors({
    origin:"http://localhost:3000",
    credentials: true,
}))
app.use(cookieParser());



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../client/public/upload')
    },
    filename: function (req, file, cb) {
      cb(null , Date.now() + file.originalname )
    }
  })
  
  const upload = multer({ storage: storage })



app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Credentials",true)
    next()
})


app.post("/api/upload",upload.single("file"),(req,res)=>{
    const file=req.file;
    res.status(200).json(file.filename);
})
app.use("/api/auth",authRoutes)
app.use("/api/likes", likeRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/users", userRoutes);
app.use("/api/relationships", relationshipRoutes);


app.listen(5000,()=>{
    console.log("CONNECTED")
})
