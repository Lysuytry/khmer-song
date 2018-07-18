import app from './app';
import {chatHandler} from './socket.io/socket-handler';

const server = require('http').Server(app);
const io = require('socket.io')(server);

const { PORT } = process.env;

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

//io.of('/api/v1/rooms').on('connection', chatHandler);
io.of('/api/v1/chatroom').on('connection', chatHandler);

server.listen(PORT, () => {
  console.log(`We are open port ${PORT} for our express app`);
});

