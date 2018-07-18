import {Router} from 'express';
import {getRoomList, getRoomChatById, createRoom, getRoomChat} from './room.api';

const routeRoom = Router();

routeRoom.get('/', getRoomList);
routeRoom.post('/', createRoom);
routeRoom.get('/chat', getRoomChat);
routeRoom.get('/:id', getRoomChatById);

export default routeRoom;
