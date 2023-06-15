const express = require('express');
const router = express.Router();


const commentControllers = require('../controllers/commentController');
const Authentication = require('../middlewares/Auth');

router.get('/getComments', commentControllers.GetComments);
router.get('/getComment/:id', commentControllers.GetComment);
router.post('/addComment', Authentication, commentControllers.AddComment);
router.delete('/deleteComment/:id', Authentication, commentControllers.DeleteComment);
router.put('/updateComment/:id', Authentication, commentControllers.UpdateComment);

module.exports = router;