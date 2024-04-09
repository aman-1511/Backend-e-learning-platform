const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/userModel');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please fill in all the details.',
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User is not registered.',
            });
        }

        if (await bcrypt.compare(password, user.password)) {
            const payload = {
                id: user._id,
                email: user.email,
                role: user.role 
            };

            const token = jwt.sign(payload, 'Aryan', {
                expiresIn: '2h' // You should use a more secure secret in production
            });

            const userInfo = {
                _id: user._id,
                userName: user.userName,
                email: user.email,
                profilePic: user.profilePic, 
                bio: user.aboutMe,
                token // Include the token in the user info response
            };

            // Return the user info and token
            return res.status(200).json({
                success: true,
                message: 'Login successful',
                user: userInfo
            });

        } else {
            return res.status(403).json({
                success: false,
                message: 'Password does not match.',
            });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: 'Login failure.'
        });
    }
};
