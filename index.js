var fs = require('fs');
var express = require('express');
var multer = require('multer');
var path = require('path')

// var router = express.Router();
// var upload = require('./fileupload');

var app = new express();

var storage = multer.diskStorage({
    //设置上传后文件路径，uploads文件夹会自动创建。
    destination: function(req, file, cb) {
        cb(null, './upload')
    },
    //给上传文件重命名，获取添加后缀名
    filename: function(req, file, cb) {
        var fileFormat = (file.originalname).split(".");
        cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
});

var upload = multer({ 
  storage: storage
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res, next) {
    var  form  =  fs.readFileSync('./public/index.html',   { encoding:   'utf8' })
    res.send(form)
})

app.post('/upload', upload.single('avatar'), function(req, res, next) {
    if (req.file) {
        res.send('文件上传成功')
        console.log(req.file);
        console.log(req.body);
    }
});

app.listen(process.env.PORT || 8004, function() {
    console.log("应用实例，访问地址为 localhost:8004")
})