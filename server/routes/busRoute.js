import express from 'express';
import { addBus, getBusById, listBus, removeBus, updateBus } from '../controllers/busController.js';
import { captainLogin, captainLogout, Direction, filterResult, searchResult, updateLocation} from '../controllers/commonController.js';

const busRouter = express.Router();

busRouter.post('/addbus', addBus);
busRouter.get('/allbuses', listBus);
busRouter.delete('/removebus/:id', removeBus);
busRouter.put('/updatebus/:id', updateBus);
busRouter.get('/search', searchResult);

busRouter.post('/get-bus-by-id/:id', getBusById);
busRouter.get('/filter', filterResult);
busRouter.get('/direction', Direction);
busRouter.post('/captain-login', captainLogin);
busRouter.post('/captain-logout', captainLogout);
busRouter.post('/update-location', updateLocation);


export default busRouter;