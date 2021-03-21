const express = require('express');
const router = express.Router();
const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload/')
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})
const fileFilterCheck = (req, file, cb) => {
    const fileTypes = /jpg|jpeg|png/;
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);
    if (extName && mimeType) {
        return cb(null, true)
    } else {
        cb("images only")
    }
}
const upload = multer({
    storage: storage,
    fileFilter: fileFilterCheck
})

router.post("/", upload.single("image"), (req, res) => {
    res.send(`/${req.file.path}`)
})


module.exports = router;