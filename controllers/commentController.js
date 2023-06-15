const Comment = require('../Models/Comment');

exports.AddComment = function(req, res) {

    //check if productid is valid
    if (!req.body.ProductId) {
        res.status(400).send({
            message: "Productid can not be empty"
        });
    }

    //create a new comment
    const comment = new Comment({
        productId: req.body.ProductId,
        userId: Number(req.user.userId),
        commentText: req.body.CommentText,
        rating: req.body.Rating,
        commentImage: req.body.Image
    });

    comment.save(function(err) {
        if (err) {
            res.status(500).json({
                status: 500,
                message: "Some error occurred while creating the Comment.",
                error: err
            });
        } else {
            res.json({
                status: 200,
                message: "Comment created successfully"
            });
        }
    });


};

exports.UpdateComment = function(req, res) {

    //check if commentid is valid
    if (!req.params.id) {
        res.status(400).json({
            status: 400,
            message: "Commentid can not be empty"
        });
    }

    //check if comment belongs to user

    Comment.findOne({ commentId: Number(req.params.id) }, function(err, comment) {
            if (err) {
                res.status(500).json({
                    status: 500,
                    message: "Some error occurred while retrieving comment.",
                    error: err
                });
            } else {
                if (comment == null) {
                    res.status(404).json({
                        status: 404,
                        message: "Comment not found."
                    });
                }
                if (comment.userId != req.user.userId) {
                    res.status(403).json({
                        status: 403,
                        message: "You are not authorized to update this comment."
                    });
                } else {
                    //update comment
                    Comment.findOneAndUpdate({ commentId: Number(req.params.id) }, {
                        $set: {
                            commentText: req.body.CommentText,
                            rating: req.body.Rating,
                            commentImage: req.body.Image
                        }
                    }, {
                        new: true
                    }, function(err, comment) {
                        if (err) {
                            res.status(500).json({
                                status: 500,
                                message: "Some error occurred while updating the comment.",
                                error: err
                            });
                        } else {
                            res.json({
                                status: 200,
                                message: "Comment updated successfully"
                            });
                        }
                    });
                }
            }
        }

    );
};

exports.GetComments = function(req, res) {

    //get all comments
    Comment.find({}, function(err, comments) {
        if (err) {
            res.status(500).json({
                status: 500,
                message: "Some error occurred while retrieving comments.",
                error: err
            });
        } else {
            res.json({
                status: 200,
                message: "Comments retrieved successfully",
                data: comments
            });
        }
    });

};

exports.GetComment = function(req, res) {

    //get comment by productid

    Comment.find({ productId: Number(req.params.id) }, function(err, comments) {
        if (err) {
            res.status(500).json({
                status: 500,
                message: "Some error occurred while retrieving comments.",
                error: err
            });
        } else {
            res.json({
                status: 200,
                message: "Comments retrieved successfully",
                data: comments
            });
        }
    });

};

exports.DeleteComment = function(req, res) {

    //delete comment by commentid

    Comment.findOne({ commentId: Number(req.params.id) }, function(err, comment) {
        if (err) {
            res.status(500).json({
                status: 500,
                message: "Some error occurred while retrieving comments.",
                error: err
            });
        } else {
            if (comment == null) {
                res.status(404).json({
                    status: 404,
                    message: "Comment not found."
                });
            }
            if (comment.userId != req.user.userId) {
                res.status(403).json({
                    status: 403,
                    message: "You are not authorized to delete this comment."
                });
            } else {
                Comment.remove({ commentId: Number(req.params.id) }, function(err, comment) {
                    if (err) {
                        res.status(500).json({
                            status: 500,
                            message: "Some error occurred while deleting the comment.",
                            error: err
                        });
                    } else {
                        res.json({
                            status: 200,
                            message: "Comment deleted successfully"
                        });
                    }
                });
            }
        }
    });

};