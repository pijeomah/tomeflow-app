const Comment = require("../models/Comment")


module.exports = {
    createComment: async (req, res) => {
        try { 
           
          await Comment.create({
            comment: req.body.comment,
            likes: 0,
            reviewId: req.params.id,
            createdBy:  req.user.userName,
            createdById: req.user.id
            
          });
          console.log("Comment has been added!");
          res.redirect("/review/" + req.params.id);
        } catch (err) {
          console.log(err);
        }
      },
    deleteComments: async(req,res) =>{
      try {
        //we make a request to the dB to deleteOne  based on the the comment id passed in the Url
        await Comment.deleteOne({_id: req.params.commentId })
        //we reedirect the page after deleting the comment to the page with the post
        res.redirect("/post/" + req.params.postId)
      } catch (err) {
        console.log(err)
      }
      }
}
