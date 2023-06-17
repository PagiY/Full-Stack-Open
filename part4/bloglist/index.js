const app = require('./app');
const logger = require('./utils/logger');
const config = require('./utils/config');

//connect to server
app.listen(config.PORT, () => {
	logger.info(`Serving at PORT ${config.PORT}`);
});




