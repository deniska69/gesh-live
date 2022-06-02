const Router = require('express');
const router = new Router();
const authMiddleware = require('../middleware/auth.middleware');
const fileController = require('../controllers/fileController');

router.post('/avatar', authMiddleware, fileController.uploadAvatar);
router.post('/news', fileController.uploadNews);
router.post('/events', fileController.uploadEvents);
router.post('/hotelGalleryUpload', authMiddleware, fileController.hotelGalleryUpload);
router.post('/hotelGalleryDelete', authMiddleware, fileController.hotelGalleryDelete);
router.post('/roomGalleryUpload', authMiddleware, fileController.roomGalleryUpload);
router.post('/roomGalleryDelete', authMiddleware, fileController.roomGalleryDelete);

module.exports = router;
