const express = require('express');
const router = express.Router();






router.get('/:route', (req, res, next) => {
    const route = req.params.route;
    if (route == "user") {
        res.status(200).json({
            status: 200,
            apis: [{
                method: 'GET',
                url: "/api/user/all",
                response: "JSON: { _id(mongoose.id) , count(number of users) , success: true, users: Array }",
                info: "GET All Users"
            }, {
                method: 'GET',
                url: "/api/user/:id/user",
                param: ":id => userId(mognoose.id)",
                response: "JSON: { user: user , success: true }",
                info: "GET User By ID"
            }, {
                method: 'GET',
                url: "/api/user/mostFollowed",
                response: "JSON: { mostFollowed: user , users: rest of users , success: true }",
                info: "Get Most Followed User"
            }, {
                method: 'POST',
                url: "/api/user/create",
                body: "JSON: { name: String , email: Email, password: String }",
                response: "{ success: true , message: String, _id: userId  }",
                info: "Create User"

            }, {
                method: 'POST',
                url: "/api/user/addFollow",
                body: "JSON: { user: objectID , following: objectID }",
                response: "{ success: true , message: String  }",
                info: "Follow Users"

            }, {
                method: 'POST',
                url: "/api/user/unfollow",
                body: "JSON: { user: objectID , following: objectID }",
                response: "{ success: true , message: String  }",
                info: "Unfollow Users"

            }, {
                method: 'POST',
                url: "/api/user/login",
                body: "JSON: { email: Email, mobile:Number , password: String }",
                response: "{ success: true , message: String, user: { user.data }  }",
                info: "Login User"
            }, {
                method: 'PATCH',
                url: "/api/user/:id/edit",
                response: "JSON: sent the updated fields only",
                info: "Update User"
            }, {
                method: 'DELETE',
                url: "/api/user/:id",
                params: ":id => user.id(mongoose.id)",
                response: "JSON: { success: true , message: String }",
                info: "Delete User By Id"
            }]
        })
    } else if (route === 'post') {
        res.status(200).json({
            status: 200,
            apis: [{
                method: 'GET',
                url: "/api/post/all",
                response: "JSON: { _id(mongoose.id) , count(number of users) , success: true, posts: Array }",
                info: "GET All Posts"
            }, {
                method: 'GET',
                url: "/api/post/:postId",
                param: ":id => userId(mognoose.id)",
                response: "JSON: { post: post , success: true }",
                info: "GET Post By Post.id"
            }, {
                method: 'GET',
                url: "/api/post/:userId/user",
                params: ":user => user.id(mongoose.id)",
                body: "JSON: { name: String , email: Email, password: String }",
                response: "{ success: true , message: String, _id: userId  }",
                info: "Get Posts For Specific User"

            }, {
                method: 'GET',
                url: "/api/user/mostLiked",
                response: "JSON: { mostLiked: user , posts: rest of posts , success: true }",
                info: "Get Most Liked Post"
            }, {
                method: 'POST',
                url: "/api/post/create",
                body: "JSON: { user: user.id, body:String }",
                response: "{ success: true , message: String, user: { user.data }  }",
                info: "Create Post"
            }, {
                method: 'POST',
                url: "/api/post/:postId/doLike",
                params: ":postId => post.id(mogoose.id)",
                body: "likes: { Array of User.id }",
                response: "JSON: sent the updated fields only",
                info: "Add/Remove Like to Post"
            }, {
                method: 'DELETE',
                url: "/api/post/:postId",
                params: ":posId => post.id(mongoose.id)",
                response: "JSON: { success: true , message: String }",
                info: "Delete Post By Post.id"
            }]
        })
    } else if (route === 'group') {
        res.status(200).json({
            status: 200,
            apis: [{
                method: 'GET',
                url: "/api/group/all",
                response: "JSON: { _id(mongoose.id) , count(number of users) , success: true, groups: Array }",
                info: "GET All Grpoups"
            }, {
                method: 'GET',
                url: "/api/group/:groupId",
                param: ":groupId => groupId(mognoose.id)",
                response: "JSON: { group: group , success: true }",
                info: "GET Group By Group.id"
            }, {
                method: 'GET',
                url: "/api/group/:groupId/posts",
                params: ":group => group.id(mongoose.id)",
                response: "{ success: true , group: group  }",
                info: "Get All Posts in Group"

            }, {
                method: 'GET',
                url: "/api/group/:userId/:groupId/insideGroup",
                params: ":userId => user.id(mongoose.id),:groupId => group.id(mongoose.id)",
                response: "{ success: true , group: group  }",
                info: "Is User Inside Group"

            }, {
                method: 'POST',
                url: "/api/group/create",
                body: "JSON: { admin: user.id, title:String }",
                response: "{ success: true , message: String }",
                info: "Create Group"
            }, {
                method: 'POST',
                url: "/api/group/addPost",
                body: "user: { User.id } , group: { Group.id } , body: { String }",
                info: "Add Post to Group"
            }, {
                method: 'PATCH',
                url: "/api/group/addUser",
                body: "group: { Group.id }, user: { User.id }",
                response: "JSON: { success: true , message: String }",
                info: "Add User To Group"
            }, {
                method: 'DELETE',
                url: "/api/group/removeUser",
                body: "group: { Group.id }, user: { User.id }",
                response: "JSON: { success: true , message: String }",
                info: "Delete User From Group"
            }]
        })
    }
})






module.exports = router;

