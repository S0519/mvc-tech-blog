const router = require("express").Router();
const {User, Post, Comment} = require("../models");
const sequelize = require("../config/connection");

router.get("/", (req, res) => {
	//we need to get all posts
	Post.findAll({
			attributes: ["id", "title", "content", "user_id", "created_at"],
			include: [
				{
					model: User,
					as: "user",
					attributes: ["username"],
				},
				{
					model: Comment,
					as: "comments",
					attributes: ["id", "comment_text", "user_id", "created_at"],
				},
			],
		})
		.then((dbPostData) => {
			//serialize data
			if (!dbPostData) {
				res.status(404).json({message: "No Posts Available"});
				return;
			}
			const posts = dbPostData.map((post) => post.get({plain: true})); // serialize all the posts
			console.log(posts);
			res.render("homepage", {posts, loggedIn: req.session.loggedIn});
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

//serve up the single post page
router.get("/post/:id", (req, res) => {
	//we need to get all posts
	Post.findOne({
			where: {
				id: req.params.id,
			},
			attributes: ["id", "title", "content", "user_id", "created_at"],
			include: [
				{
					model: User,
					as: "user",
					attributes: ["username"],
				},
				{
					model: Comment,
					as: "comments",
					attributes: ["id", "comment_text", "user_id", "created_at"],
					include: [
						{
							model: User,
							as: "user",
							attributes: ["username"],
						},
					],
				},
			],
		})
		.then((dbPostData) => {
			//serialize data
			if (!dbPostData) {
				res.status(404).json({message: "No Posts Available"});
				return;
			}
			const post = dbPostData.get({plain: true}); // serialize all the posts
			console.log(post);
			const myPost = post.user_id == req.session.user_id;
			res.render("single-post", {
				post,
				loggedIn: req.session.loggedIn,
				currentUser: myPost,
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

//serve up the login page
router.get("/login", (req, res) => {
	console.log("Is logged in?", req.session.loggedIn);
	res.render("login", {loggedIn: req.session.loggedIn});
});

router.get("/logout", (req, res) => {
	if (req.session && req.session.user_id) {
		req.session.destroy(null);
		res.render("homepage");
		return;
	}
})

//serve up the dashboard
router.get("/dashboard", (req, res) => {
	//we need to get all posts
	if (!req.session.user_id) {
		//send them to the login page instead
		res.render("login", {loggedIn: req.session.loggedIn});
		return;
	}
	console.log(req.session.user_id, " this is the session id");
	Post.findAll({
			where: {
				user_id: req.session.user_id,
			},
			attributes: ["id", "title", "content", "user_id", "created_at"],
			include: [
				{
					model: User,
					as: "user",
					attributes: ["username"],
				},
				{
					model: Comment,
					as: "comments",
					attributes: ["id", "comment_text", "user_id", "created_at"],
					include: [
						{
							model: User,
							as: "user",
							attributes: ["username"],
						},
					],
				},
			],
		})
		.then((dbPostData) => {
			//serialize data
			if (!dbPostData) {
				res.status(404).json({message: "No Posts Available"});
				return;
			}
			const posts = dbPostData.map((post) => post.get({plain: true})); // serialize all the posts
			console.log(posts);
			res.render("dashboard", {posts, loggedIn: req.session.loggedIn});
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

router.get("/post", (req, res) => {
	if (!req.session.user_id) {
		//send them to the login page instead
		res.render("login", {loggedIn: req.session.loggedIn});
		return;
	}
	res.render("create-post", {loggedIn: req.session.loggedIn});
});
//load the edit page
router.get("/dashboard/edit/:id", (req, res) => {
	if (!req.session.user_id) {
		//send them to the login page instead
		res.render("login", {loggedIn: req.session.loggedIn});
		return;
	}
	//we need to get all posts
	Post.findOne({
			where: {
				id: req.params.id,
			},
			attributes: ["id", "title", "content", "user_id", "created_at"],
			include: [
				{
					model: User,
					as: "user",
					attributes: ["username"],
				},
				{
					model: Comment,
					as: "comments",
					attributes: ["id", "comment_text", "user_id", "created_at"],
					include: [
						{
							model: User,
							as: "user",
							attributes: ["username"],
						},
					],
				},
			],
		})
		.then((dbPostData) => {
			//serialize data
			if (!dbPostData) {
				res.status(404).json({message: "No Posts Available"});
				return;
			}
			const post = dbPostData.get({plain: true}); // serialize all the posts
			console.log(post);
			const myPost = post.user_id == req.session.user_id;
			res.render("edit-post", {
				post,
				loggedIn: req.session.loggedIn,
				post_id: req.params.id,
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});
module.exports = router;
