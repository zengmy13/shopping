var express = require('express');
var router = express.Router();
var {checkuserlogin, isadmin} = require("../middleware/index")
var {createorder, getorderbyid, getuserorders, updateordertopay, admingetallorders, changedeliver} = require("../controller/order")


/* GET users listing. */
router.get('/allorders', checkuserlogin, getuserorders)
router.post('/create', checkuserlogin, createorder)
router.get('/:id', checkuserlogin, getorderbyid)
router.put('/:id', checkuserlogin, updateordertopay)
router.get('/admin/all', checkuserlogin, isadmin, admingetallorders)
router.put('/:id/deliver', checkuserlogin, isadmin, changedeliver)


module.exports = router;