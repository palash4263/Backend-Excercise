const Video = require('../models/video');


 const getMovies = async (req, res) => {
    try {
      const response = await fetch('https://accedo-ps-programming-exam.s3-ap-southeast-1.amazonaws.com/movies.json');
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };

 const getVideos = async (req, res) => {
  try {
    const videos = await Video.find();
    res.json(videos);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

//get by id
const getVideoById = async (req, res) => {
  const { id } = req.params;

  try {
    const video = await Video.findById(id);
    if (!video) {
      return res.status(404).send('Video not found');
    }

    res.json(video);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

//add video
const  createVideo = async (req, res) => {
  const { id, title, description, type, publishedDate, availableDate, metadata, contents, credits, parentalRatings, images, categories } = req.body;

  const video = new Video({
    id,
    title,
    description,
    type,
    publishedDate,
    availableDate,
    metadata,
    contents,
    credits,
    parentalRatings,
    images,
    categories,
  });

  video.validate(function(error) {
    if (error) {
      console.error(error);
      res.status(400).send('Bad Request');
    } else {
      video.save()
        .then(function() {
          res.status(201).send('Video created');
        })
        .catch(function(error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
        });
    }
  });
};

//update video
const updateVideo = async (req, res) => {
  const { id } = req.params;
  const { type, description } = req.body;

  try {
    const video = await Video.findOne({ id });
    if (!video) {
      return res.status(404).send('Video not found');
    }

    if (type) {
      video.type = type;
    }
    if (description) {
      video.description = description;
    }

    await video.save();
    res.send('Video updated');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

//delete video
const deleteVideo = async (req, res) => {
  const { id } = req.params;

  try {
    const video = await Video.findById(id);
    if (!video) {
      return res.status(404).send('Video not found');
    }

    await Video.deleteOne({ _id: id });
    res.status(200).send('Video deleted');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};


module.exports = {getMovies,getVideoById,deleteVideo,updateVideo,createVideo,getVideos}
 

