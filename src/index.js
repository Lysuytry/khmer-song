import app from './app';

const port = 3000;

//if no route match => matched this route instead
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});
//error handling middleware
//always at the bottom of the code
app.use((err, req, res, next) => {
    return res.status(err.status || 500).json(err);
});


app.listen(port, () => {
    console.log(`We are open port ${port} for our express app`);
});