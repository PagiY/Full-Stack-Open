const express = require('express');
const cors = require('cors');
const app = express();
const blogRouter = require('./controllers/blog');
const mongoose = require('mongoose');
const config = require('./utils/config');
const logger = require('./utils/logger');

mongoose.connect(config.MONGODB_URI)
	.then(() => {
		logger.info('successfully connected to database!');
	})
	.catch(() => {
		logger.error('error connecting to database');
	});

//middlewares
app.use(cors());
app.use(express.json());

app.use('/api/blogs', blogRouter);
module.exports = app;


