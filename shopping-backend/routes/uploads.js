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
    const filetypes = /jpg|jpeg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
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