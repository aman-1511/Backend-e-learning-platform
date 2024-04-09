const bcrypt = require('bcrypt');
const User = require('../../models/userModel');

const cloudinary = require('cloudinary').v2;


function checkIfAuthorized(req) {
  
    return req.user && req.user.role === 'superadmin';
}

exports.signUp = async (req, res) => {
    try {
        const { userName, fullName, email, password, role } = req.body;
        const profilePic = req.file ? req.file.buffer : null;

        console.log(req.file);
        // if (role === 'superadmin' && !checkIfAuthorized(req)) {
        //     return res.status(403).json({
        //         success: false,
        //         message: 'Unauthorized to create a superadmin account'
        //     });
        // }

        if (!profilePic) {
            return res.status(400).json({
                success: false,
                message: 'Profile Picture not provided',
            });
        }

       
//         const cloudinaryResponse = await cloudinary.uploader.upload(profilepic.path, {
//             resource_type: "auto",
//             public_id: `${Date.now()}`,
//         });
// s
       
        const existingUser = await User.findOne({ email });
        const existingUserName = await User.findOne({ userName });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Email already in use',
            });
        }
        if (existingUserName) {
            return res.status(400).json({
                success: false,
                message: 'User Name already exists'
            });
        }

    
        // if(!profilePic){
        //     return res.status(400).json({
        //         success:false,
        //         message:"image is not there"
        //     })
        // }
      
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            userName,
            fullName,
            email,
            password: hashedPassword,
            profilePic, // Directly store the image as a Buffer
            role: role || 'user' 
        });


        return res.status(200).json({
            success: true,
            message: 'User created successfully',
            user: {
                id: user._id,
                userName: user.userName,
                email: user.email,
                role: user.role
            }
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: `User cannot be registered. Please try again later. ${err}`,
        });
    }
};
