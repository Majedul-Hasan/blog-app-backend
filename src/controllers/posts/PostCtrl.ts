
import expressAsyncHandler from "express-async-handler";

import Post from '../../model/post/Post'
import User from '../../model/user/User';


import Filter from 'bad-words';

import fs from "fs";

import cloudinaryUploadImage from "../../utils/cloudinary";
import { Request, Response } from "express";
import validateMongodbId from "../../utils/validateMongoDbId";
import blockUser from "../../utils/blockUser";



/*********************************
 * create post
 * *******************************
 */

const createPostCtrl = expressAsyncHandler(async (req: Request, res: Response) => {
  const _id = req.user?._id
  // display massage if user id blocked
  blockUser(req.user);
  // validateMongodbId(req.body.user)
  // check for bad-words
  const filter = new Filter
  const isProfane = filter.isProfane(req.body.title) || filter.isProfane(req.body.description)
  //console.log(isProfane)
  // block user
  if (isProfane) {
    await User.findByIdAndUpdate(_id, {
      isBlocked: true
    });
    throw new Error('Creating failed because it contains profane words and you have been blocked')
  }
  //  bad-words 



  // prevent user if user is starter

  if (req?.user?.accountType === "starter account" && req?.user?.postCount >= 2) throw new Error('starter account can only create two posts ')
  // 1. get the path to img
  // console.log(req.file)

  const localPath = `public/images/posts/${(req.file as Express.Multer.File)?.filename}`

  //2. upload to cloudinary 

  const imageUploaded: any = await cloudinaryUploadImage(localPath)
  //console.log(imageUploaded.secure_url)

  try {


    const post = await Post.create({
      ...req.body,
      title: req?.body?.title,
      category: req?.body?.category,
      description: req?.body?.description,
      image: imageUploaded?.secure_url,
      user: _id,

    })
    // update the user post count
    await User.findByIdAndUpdate(_id, {
      $inc: { postCount: 1 }
    }, { new: true }
    )



    //res.json(imageUploaded)
    fs.unlinkSync(localPath)

    // console.log(post)
    res.json(post)
  } catch (error) {
    res.json(error)

  }
})


/*********************************
* Fetch all posts
* *******************************
*/

const fetchPostsCtrl = expressAsyncHandler(async (req: Request, res: Response) => {

  const hasCategory = req.query.category
  //console.log(hasCategory)
  try {

    // check if it has a category



    if (hasCategory === "undefined") {

      const posts = await Post.find({}).populate('user').sort("-createdAt")
      res.json(posts)
    } else {
      const posts = await Post.find({ category: hasCategory }).populate('user').sort("-createdAt")
      res.json(posts)

    }


  } catch (error) {
    res.json(error)
  }
})


/*********************************
* Fetch a post
* *******************************
*/

const fetchPostCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params
  validateMongodbId(id as string)
  //console.log(id)
  try {
    const post = await Post.findById(id).populate("user").populate('disLikes').populate('likes').populate('comments')

    // update Number of views of a post

    await Post.findByIdAndUpdate(id, {
      $inc: { numViews: 1 } // inc === increment 
    }, {
      new: true
    })



    res.json(post)
  } catch (error) {
    res.json(error)
  }
})


/*********************************
* Update a post
* *******************************
*/

const updatePostCtrl = expressAsyncHandler(async (req, res) => {

  const { id } = req.params
  validateMongodbId(id as string)
  try {
    const post = await Post.findByIdAndUpdate(id, {
      ...req.body,
      user: req.user?._id
    }, {
      new: true
    })

    res.json(post)
  } catch (error) {
    res.json(error)
  }


})


/*********************************
* delete a post
* *******************************
*/

const deletePostCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params
  validateMongodbId(id as string)
  try {
    await Post.findByIdAndDelete(id)

  } catch (error) {
    res.json(error)

  }

  res.json('post deleted successfully')

})

/*********************************
* Likes
* *******************************
*/

const toggleLikesToPostCtrl = expressAsyncHandler(async (req, res) => {
  // find the post to like
  const { postId } = req.body
  validateMongodbId(postId)
  //console.log(postId)
  const post = await Post.findById(postId)
  // find the login user

  const loginUserId = req?.user?._id
  //console.log(loginUserId)

  // 3. check if this user liked this post
  const isLiked = post?.isLiked
  //console.log(isLiked)

  // 4. check if this user disliked this post
  const alreadyDisliked = post?.disLikes?.find((userId: string) => userId?.toString() === loginUserId?.toString())

  //  5 remove the user if disliked

  if (alreadyDisliked) {
    const post = await Post.findByIdAndUpdate(postId, {
      $pull: {
        disLikes: loginUserId,

      },
      isDisiked: false
    }, {
      new: true
    })
    res.json(post)

  }
  // remove the  user if liked
  //Toggle

  if (isLiked) {
    const post = await Post.findByIdAndUpdate(postId, {
      $pull: {
        likes: loginUserId,

      },
      isLiked: false
    }, {
      new: true
    })
    res.json(post)

  } else {
    // to add likes
    const post = await Post.findByIdAndUpdate(postId, {
      $push: {
        likes: loginUserId,
      },
      isLiked: true
    }, {
      new: true
    })
    res.json(post)
  }
})


/*********************************
* Dislikes
* *******************************
*/

const toggleDislikesToPostCtrl = expressAsyncHandler(async (req, res) => {
  // find the post to dislike
  const { postId } = req.body
  validateMongodbId(postId)
  //console.log(postId)
  const post = await Post.findById(postId)
  // find the login user

  const loginUserId = req?.user?._id
  //console.log(loginUserId)

  // 3. check if this user disliked this post
  const isDisiked = post?.isDisiked
  //console.log(isDisiked)

  // 4. check if this user liked this post
  const alreadyLiked = post?.likes?.find((userId: string) => userId?.toString() === loginUserId?.toString())

  //  5 remove the user if liked

  if (alreadyLiked) {
    const post = await Post.findByIdAndUpdate(postId, {
      $pull: {
        likes: loginUserId,

      },
      isLiked: false
    }, {
      new: true
    })
    res.json(post)

  }

  // toggle
  // remove the  user if disliked

  if (isDisiked) {
    const post = await Post.findByIdAndUpdate(postId, {
      $pull: {
        disLikes: loginUserId,

      },
      isDisiked: false
    }, {
      new: true
    })
    res.json(post)

  } else {
    // to dislikes
    const post = await Post.findByIdAndUpdate(postId, {
      $push: {
        disLikes: loginUserId,
      },
      isDisiked: true
    }, {
      new: true
    })
    res.json(post)
  }
})

export { createPostCtrl, fetchPostsCtrl, fetchPostCtrl, updatePostCtrl, deletePostCtrl, toggleLikesToPostCtrl, toggleDislikesToPostCtrl }