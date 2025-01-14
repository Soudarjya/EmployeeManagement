const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

// Configure Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'profile_pictures', // Cloudinary folder name
    allowed_formats: ['jpg', 'jpeg', 'png'], // Allowed file formats
    transformation: [{ width: 300, height: 300, crop: 'limit' }], // Optional resizing
  },
});

// Set up Multer
const upload = multer({ storage });

module.exports = upload;
