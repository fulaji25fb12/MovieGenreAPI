let express = require("express");
let router = express.Router();
let multer = require("multer");
let imageModel = require("../dbModel/image.model");
let port = "http://localhost:4600/";
let storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, "./uploads/")
    },
    filename: function(req,file,cb){
        cb(null, file.originalname);
    }
});

let filefilter = function(req,file,cb){
    if(file.mimetype === "image/png" || file.mimetype === "image/jpeg" || file.mimetype === "image/jpg"){
        cb(null, true);
    }
    else{
        cb(null,false);
    }
}

let uploads = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: filefilter
});

router.post("/file", uploads.single("image"), async(req,res) => {
    let file = new imageModel({
        image: port + "/uploads/" + req.file.filename
    });
    let data = await file.save();
    res.send(data);
});
module.exports = router;