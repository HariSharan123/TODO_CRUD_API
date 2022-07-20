const express = require("express");
const router = express.Router();
const adminController= require("../controller/admin");

router.post('/admin/signup', adminController.signup);
router.post('/admin/login', adminController.login);


module.exports=router;