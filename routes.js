function handlePost(req, res) {
  res.send('1, 2, 3, it works');
}

export default (app) => {
	app.post('/api', handlePost)
};