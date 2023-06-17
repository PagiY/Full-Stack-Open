const app = require('./app');
const logger = require('./utils/logger');
const config = require('./utils/config');

//connect to server
app.listen(config.PORT, () => {
	logger.info(`Serving at PORT ${config.PORT}`);
});

// const express = require('express');
// const cors = require('cors');
// const app = express();
// const mongoose = require('mongoose');

// const blogSchema = new mongoose.Schema({
// 	title: String, 
// 	author: String,
// 	url: String,
// 	likes: Number,
// });	

// const Blog = mongoose.model('Blog', blogSchema);

// const url = 'mongodb+srv://pagiy:admin12345@bloglist.hk9gpur.mongodb.net/?retryWrites=true&w=majority';

// mongoose.connect(url)
// 	.then(() => {
// 		console.log('successfully connected to database!');
// 	})
// 	.catch(() => {
// 		console.log('error connecting to database');
// 	});
//middlewares
// app.use(cors());
// app.use(express.json());

//routes
// app.get('/api/blogs', (request, response) => {
// 	Blog.find({})
// 		.then(blogs => response.json(blogs));
// });

// app.post('/api/blogs', (request, response) => {
// 	const blog = new Blog(request.body());

// 	blog
// 		.save()
// 		.then(newBlog => response.status(201).json(newBlog));
// });


