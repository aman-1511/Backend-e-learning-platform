const cloudinary = require('cloudinary');
function cloudinaryConnect() {
cloudinary.v2.config({
  cloud_name: 'dycjfvkno',
  api_key: '155367423744488',
  api_secret: '9Q207NuD_Saggw02sFjZQoniwks',
  secure: true,
});
}

module.exports = cloudinaryConnect;