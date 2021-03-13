var express = require('express');
var router = express.Router();
var {checkuserlogin, isadmin} = require("../middleware/index")
var {login, register, getprofile, updateprofile, admingetallusers, deleteuser, updateadminuser, adminfinduser} = require('../controller/user');

/* GET users listing. */

router.post('/login', login);
router.post('/register', register);
router.get('/:id', checkuserlogin, getprofile);
router.put("/profile", checkuserlogin, updateprofile);
router.delete("/:id", checkuserlogin, isadmin, deleteuser)
router.put("/:id", checkuserlogin, isadmin, updateadminuser)
router.get("/admin/:id", checkuserlogin, isadmin, adminfinduser)
router.get("/", checkuserlogin, isadmin, admingetallusers)


module.exports = router;
