const dummy = (blogs) => {
	console.log(blogs);
	return 1;
};

const totalLikes = (blogs) => {

	if(blogs.length <= 0){
		return 0;
	}
	else if(blogs.length === 1){
		return blogs[0].likes;
	}
	else{
		const reducer = (sum, item) => {
			return sum + item.likes;
		};

		return blogs.reduce(reducer, 0);
	}
	
};

const favoriteBlog = (blogs) => {

	const faveBlog = blogs.reduce((accumulator, current) => accumulator.likes > current.likes ? accumulator : current);
	
	return {
		title: faveBlog.title,
		author: faveBlog.author,
		likes: faveBlog.likes
	};
};

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog
};

