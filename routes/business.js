import Business from './../controllers/business';
import express from 'express';

const router = express.Router();

router.post('/upload', Business.upload)

export default router