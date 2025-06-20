import express from 'express';
import multer from 'multer';
import { storage } from '../cloudconfig.js';
import { addItem , getItems } from '../controller/itemcontroller.js';
import { sendEnquiryEmail } from '../controller/mailcontroller.js';
const router = express.Router();
const upload = multer({ storage });

router.use((req, res, next) => {
 
  next();
});

router.get('/test', (req, res) => {
  res.json({ message: 'Items route is working!' });
});

router.post(
  '/additems',
  upload.fields([
    { name: 'coverImage', maxCount: 1 },
    { name: 'additionalImages', maxCount: 10 },
  ]),
  (req, res, next) => {
  
    next();
  },
  addItem
);
router.get("/getitems", getItems);
router.post('/enquire', sendEnquiryEmail);
export default router;
