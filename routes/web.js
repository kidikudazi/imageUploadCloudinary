const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinaryStorage = require('multer-storage-cloudinary');
const con = require('../config/database');
const cloudinary = require('cloudinary');

require('dotenv').config();

cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.API_KEY,
	api_secret: process.env.API_SECRET
});

const storage = cloudinaryStorage({
cloudinary: cloudinary,
folder: "demo",
allowedFormats: ["jpg", "png"],
transformation: [{ width: 500, height: 500, crop: "limit" }]
});
const parser = multer({ storage: storage });


router.get('/', (req, res)=>{
	// console.log(cloudinary);
	res.render('index')
});

router.post('/file', parser.single("image"), (req, res) => {
  console.log(req.file)
 // return; // to see what is returned to you
  const image = {};
  image_url = req.file.url;
  image_id = req.file.public_id;

  var saveImage = "INSERT INTO cloud (image_url, image_id) VALUES ('"+image_url+"', '"+image_id+"' )";

  con.query(saveImage, function(err, result) {
  	// body...
  	if (err) throw err
  		// console.log(result);
  		res.render('index');
  })
});

router.get('/view', (req, res)=>{
	var fetechImages = "SELECT * FROM cloud";

	con.query(fetechImages, function(err, result){
		if(err) throw err
			res.render('gallery', {
				result
			})
	});
})


module.exports = router