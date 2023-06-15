const express = require('express');
const router = express.Router();

const userControllers = require('../controllers/userController');
const Authentication = require('../middlewares/Auth');

router.post("/register", userControllers.Register);
router.post("/login", userControllers.Login);
router.get("/getUserInfo", Authentication, userControllers.GetUserInfo);
router.post("/updateProfile", Authentication, userControllers.UpdateProfile);
router.post("/changePassword", Authentication, userControllers.ChangePassword);

module.exports = router;