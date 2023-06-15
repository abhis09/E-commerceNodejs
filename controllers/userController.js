const User = require("../Models/User");
const jwt = require('jsonwebtoken')
const { tokenSecret } = require('../config');
const { Authentication } = require("../middlewares/Auth");

exports.Register = function(req, res) {

    //check if user already exists
    User.findOne({
        emailAddress: req.body.EmailAddress
    }, function(err, user) {
        if (err) {
            res.json({
                status: 500,
                message: "Error occured: " + err
            });
        } else {
            if (user) {
                res.json({
                    status: 401,
                    message: "User already exists"
                });
            } else {
                //create new user
                const user = new User({
                    username: req.body.Username,
                    emailAddress: req.body.EmailAddress,
                    password: req.body.Password,
                    shippingAddress: req.body.ShippingAddress,
                });

                //save user
                user.save(function(err) {
                    if (err) {
                        res.json({
                            status: 500,
                            message: "Error occured: " + err
                        });
                    } else {
                        res.json({
                            status: 200,
                            message: "User registered successfully"
                        });
                    }
                });
            }
        }
    });
};


exports.Login = function(req, res) {

    //login user
    const user = User.findOne({
            emailAddress: req.body.EmailAddress,
            password: req.body.Password
        }, function(err, user) {
            if (err) {
                res.json({
                    status: 500,
                    message: "Error occured: " + err
                });
            } else {
                if (user) {
                    //create token
                    const token = jwt.sign({
                        _id: user._id,
                        userId: user.userId,
                        username: user.username,
                        emailAddress: user.emailAddress,
                        shippingAddress: user.shippingAddress
                    }, tokenSecret, {
                        expiresIn: '24h'
                    });

                    res.json({
                        status: 200,
                        message: "User logged in successfully",
                        data: user,
                        token: token
                    });
                } else {
                    res.json({
                        status: 401,
                        message: "Invalid email or password"
                    });
                }
            }
        }

    )
};


exports.GetUserInfo = function(req, res) {

    return res.json({
        status: 200,
        message: "User info",
        data: req.user
    });

};

exports.UpdateProfile = function(req, res) {

    //update user
    User.findOneAndUpdate({
        _id: req.user._id
    }, {
        $set: {
            username: req.body.Username,
            shippingAddress: req.body.ShippingAddress
        }
    }, function(err, user) {
        if (err) {
            res.json({
                status: 500,
                message: "Error occured: " + err
            });
        } else {
            res.json({
                status: 200,
                message: "User updated successfully"
            });
        }
    });

};

exports.ChangePassword = function(req, res) {

    //change password

    User.findOne({
            _id: req.user._id
        }, function(err, user) {
            if (err) {
                res.json({
                    status: 500,
                    message: "Error occured: " + err
                });
            } else {
                if (user) {
                    if (user.password === req.body.OldPassword) {
                        User.findOneAndUpdate({
                            _id: req.user._id
                        }, {
                            $set: {
                                password: req.body.NewPassword
                            }
                        }, function(err, user) {
                            if (err) {
                                res.json({
                                    status: 500,
                                    message: "Error occured: " + err
                                });
                            } else {
                                res.json({
                                    status: 200,
                                    message: "Password changed successfully"
                                });
                            }
                        });
                    } else {
                        res.json({
                            status: 401,
                            message: "Old password is incorrect"
                        });
                    }
                } else {
                    res.json({
                        status: 401,
                        message: "User not found"
                    });
                }
            }
        }

    )
};