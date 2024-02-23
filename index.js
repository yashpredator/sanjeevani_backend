const express = require('express');
const {connectToDb, getDb} = require('./src/configuration/config')
const port = process.env.PORT || 3000;
const app = express();
const cookieParser=require("cookie-parser")
const userRouter=require("../sanjeevani_backend/src/routes/patient/user.js");
const doctorRouter=require("../sanjeevani_backend/src/routes/doctor/admin.js");
const cors = require('cors');
//db connection
const {notFound,errorHandler}=require("../sanjeevani_backend/src/middleware/apierror.js")
let db
connectToDb((err)=>{
    if(!err) {
        app.listen(port,()=>{
            console.log('Listen to the port: '+ port);
        }) 
        db = getDb()
    }
})

app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
app.use(userRouter);
app.use(doctorRouter);


app.get('/',(req,res)=>{
    res.send('This is the home page');
});
app.use(notFound);
app.use(errorHandler);