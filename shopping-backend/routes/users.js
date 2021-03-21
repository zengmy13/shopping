var express = require('express');
var router = express.Router();
var {checkUserLogin, isAdmin} = require("../middleware/index")
var {login, register, getProfile, updateProfile, adminGetAllUsers, deleteUser, updateAdminUser, adminFindUser} = require('../controller/user');

/* GET users listing. */

router.post('/login', login);
router.post('/register', register);
router.get('/:id', checkUserLogin, getProfile);
router.put("/profile", checkUserLogin, updateProfile);
router.delete("/:id", checkUserLogin, isAdmin, deleteUser)
router.put("/:id", checkUserLogin, isAdmin, updateAdminUser)
router.get("/admin/:id", checkUserLogin, isAdmin, adminFindUser)
router.get("/", checkUserLogin, isAdmin, adminGetAllUsers)


module.exports = router;
