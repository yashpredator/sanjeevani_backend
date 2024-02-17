const express = require('express');
const bcrypt = require('bcrypt');
const path = require('path');
const userlogin=require("./src/routes/user.js");
const {connectToDb, getDb} = require('./src/configuration/config')
const port = process.env.PORT || 3000;
const RDoctor = require('../sanjeevani_backend/src/models/registerdoctor')
const RPatient = require('./src/models/user.js')
const app = express();
const cookieParser=require("cookie-parser")
const userRouter=require("../sanjeevani_backend/src/routes/user.js");
const regRouter=require("../sanjeevani_backend/src/routes/userReg.js");
//db connection
const {notFound,errorHandler}=require("../sanjeevani_backend/src/middleware/apierror.js")
let db
connectToDb((err)=>{
    if(!err) {
        // app.listen(port,()=>{
        //     console.log('Listen to the port: '+ port);
        // })
        // db = getDb()
    }
})

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
app.use(userRouter);
app.use(regRouter);
app.use(notFound);
app.use(errorHandler);

app.listen(port, ()=>{
    console.log('Listening to port number: '+port);
})

app.get('/',(req,res)=>{
    res.send('This is the home page');
});

app.post('/registerp',(req,res)=>{
    try {
        console.log(req.body);
        const RegisterPatient = new RPatient(req.body)
        RegisterPatient.save().then(() => {
            res.status(201).send(RegisterPatient);
        }).catch((err) => {
            res.status(400).send(err);
        });
    } catch (error) {
        res.status(400).send(error);
    }
})

//app.json is left will be completed soon

app.post('/registerd',async (req,res)=>{
    try {
        console.log(req.body);
        const RegisterDoctor = new RDoctor(req.body)
        RegisterDoctor.save().then(() => {
            res.status(201).send(RegisterDoctor);
        }).catch((err) => {
            res.status(400).send(err);
        });
    } catch (error) {
        res.status(400).send(error);
    }
})
