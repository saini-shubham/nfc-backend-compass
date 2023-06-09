const express = require("express");
const cors=require('cors')
require("./db/mongoose");
const Tag = require("./models/tag");
//const User = require("./models/user");
const TagReport = require("./models/tagReport");
//const hiJob = require('../src/schedules/hi')
const populate = require("../src/schedules/populateReportGeneration");
const userRouter = require('./routes/userRotes')
const tagRouter = require('./routes/tagRoutes')

var bcrypt = require("bcryptjs");
const config = require("./config");
const app = express();
const port = process.env.PORT || 5000;
app.use(cors({
origin:['*','http://localhost:3000','http://65.2.166.254']
}))

app.use(express.json());
app.use(userRouter)
app.use(tagRouter)

app.get('*',function(req,res){
   res.sendFile('/home/ubuntu/nfc-frontend/nfc-tag-front/build')
})


app.listen(port, () => {
  console.log("Server is up on port " + port);
});
