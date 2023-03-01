const express = require('express');
const router = express.Router();
const  {getAllVideos,getVideoById,createVideo,updateVideo,deleteVideo} = require('../controllers/videosController');

 
router.get('/', getAllVideos);

// GET video by ID
router.get('/:id', getVideoById);

// POST a new video
router.post('/', createVideo);

// update an existing video
router.put('/:id', updateVideo);

// DELETE a video
router.delete('/:id',deleteVideo);

module.exports = router;