module.exports = async client => {
	client.logger.success(`Logged in as ${client.user.username}`);
};
