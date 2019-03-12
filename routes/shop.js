import express from 'express';
import router from './admin';
import Shop from './../controllers/shop';

const route = express.Router();

router.post('/queryUserAllShop', Shop.queryUserShop)
router.post('/addshop', Shop.addShop)

export default router