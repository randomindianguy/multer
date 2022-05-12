const express = require('express');
const multer = require('multer');
const app = express();

const fileStorageEngine = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './images');
	},
	filename: (req, file, cb) => {
		cb(null, Date.now()+ '--' + file.originalname);// the Date.now() is not necessary, it's just to make it unique.
	},
})

const upload = multer({storage: fileStorageEngine});

app.post('/single', upload.single('image'), (req, res)=>{
    console.log(req.file);
    res.send("Single File Upload Success!");
})

app.post('/multiple', upload.array("images", 2), (req, res) => { //multer will now accept an array of objects, and another argument which is maxCount, which counts the max number of elements it will upload. 
	console.log(req.files)//instead of req.file;
	res.send('Multiple Files Uploaded!');
})

app.listen(5000, ()=>{
    console.log('server is running on port 5000');
});