const {vendorRegister , userRegister , vendorlogin , Userlogin , resetPasswordUser , resetPasswordVendor} = require("../controller/signingcontroller");
const express= require('express');
const app=express()
const router=express.Router()
router.use(express.json())

const User=require("../models/user")

router.post('/vendor/register' , vendorRegister);
router.post('/user/register' , userRegister)



router.post('/vendor/login' , vendorlogin);
router.post('/user/login' , Userlogin);

router.post('/Vendor/reset' , resetPasswordVendor);
router.post('/User/reset' , resetPasswordUser);


module.exports = router;