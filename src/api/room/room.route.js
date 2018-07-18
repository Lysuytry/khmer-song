import { Router } from 'express';
import { getRoomList, getRoomChatById, createRoom, getRoomChat, addUserToRoom , deleteRoomChatById} from './room.api';
import { validateRoomCreating, validateAddUserToRoom } from './room.middleware';
const routeRoom = Router();

routeRoom.get('/', getRoomList);
routeRoom.post('/', validateRoomCreating, createRoom);
routeRoom.get('/chat', getRoomChat);
routeRoom.get('/:id', getRoomChatById);
routeRoom.delete('/:id', deleteRoomChatById);
routeRoom.post('/:roomId/users', validateAddUserToRoom, addUserToRoom);


export default routeRoom;
