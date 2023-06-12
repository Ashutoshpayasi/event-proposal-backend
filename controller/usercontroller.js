// const User = require('../models/user.model');

// // Get user by ID
// const getUserById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user = await User.findById(id);

//     if (!user) {
//       return res.status(404).json({
//         status: 'Failed',
//         message: 'User not found'
//       });
//     }

//     res.status(200).json({
//       status: 'Success',
//       data: user
//     });
//   } catch (err) {
//     res.status(500).json({
//       status: 'Failed',
//       message: err.message
//     });
//   }
// };

// // Create a new user
// const createUser = async (req, res) => {
//   try {
//     // Extract user data from the request body
//     const { name, email, contact, password } = req.body;

//     // Create a new user object
//     const user = new User({
//       name,
//       email,
//       contact,
//       password
//     });

//     // Save the user to the database
//     const savedUser = await user.save();

//     res.status(201).json({
//       status: 'Success',
//       data: savedUser
//     });
//   } catch (err) {
//     res.status(500).json({
//       status: 'Failed',
//       message: err.message
//     });
//   }
// };

// // Other controller functions for updating, deleting, or performing other operations on users can be added here.

// module.exports = { getUserById, createUser };

const User = require('../models/user');
const cloudinary = require('../middleware/cloudinary');
const Proposals = require('../models/proposal');
const Vendor = require('../models/vendor')
const addSelectedList = async(req , res)=>{
    try{
        let id = await req.params.id;
        let user = await User.findById(id);
        if(!user){
            res.status(400).json({
                status : "Failed",
                message : "User Not Found"
            })
        }else{
            if(user.selected_items.indexOf(req.body.id) === -1){
                let updatedData = await User.findByIdAndUpdate({_id : id} , {$push : {selected_items : req.body.id}} , {new : true})
                if(updatedData){
                res.status(200).json({
                    status: "Success",
                    data : updatedData
                })}else{
                    res.status(400).json({
                        status : "Failed",
                        message : "Already Added"
                    })
                }
            }
        }
    }catch(err){
        res.status(500).json({
            status : "Failed",
            message : err.message
        })
    }
}

const delSelectedList = async(req , res)=>{
    try{
        let id = req.params.id;
        let user = await User.findById(id);
        if(!user){
            res.status(400).json({
                status : "Falied",
                message : "User Not Found"
            })
        }else{
            if(user.selected_items.indexOf(req.body.id) !== -1){
                let user = await User.findByIdAndUpdate({_id : id} , {
                    $pull : {selected_items : req.body.id},
                },{new : true});
                res.status(200).json({
                    status : "Success",
                    data : user
                })
            }else{
                res.status(400).send({
                    status : "Failed",
                    messgae : "Proposal not Found"
                })
            }
        }
    }catch(err){
        res.status(500).json({
            status : "Failed",
            message : err.message
        })
    }
}

const updateUserDp = async(req , res)=>{
    try{
        let id = req.params.id
        let image = await cloudinary.uploader.upload(req.file.path)
        let user = await User.findByIdAndUpdate({_id : id} , {
            profile_pic : image.secure_url
        })
        res.status(200).json({
            status : "Success",
            data : user
        })
    }catch(err){
        res.status(500).json({
            status : "Failed",
            messgae : err.message
        })
    }
}

const deleteUserDp = async(req , res)=>{
    try{
        let id = req.params.id
        let user = await User.findById(id);
        if(!user){
            res.status(400).json({
                status : "Success",
                message : "User Not Found"
            })
        }else{
            await cloudinary.uploader.destroy(user.profile_pic);
            await User.findByIdAndUpdate({_id : id} , {profile_pic : null})
            res.status(200).json({
                status : "Success"
            })
        }
    }catch(err){
        res.status(500).json({
            status : "Failed",
            messgae : err.message
        })
    }
}

const updateVendorDp = async(req , res)=>{
    try{
        let id = req.params.id
        let image = await cloudinary.uploader.upload(req.file.path)
        let user = await Vendor.findByIdAndUpdate({_id : id} , {
            profile_pic : image.secure_url
        })
        res.status(200).json({
            status : "Success",
            data : user
        })
    }catch(err){
        res.status(500).json({
            status : "Failed",
            messgae : err.message
        })
    }
}

const deleteVendorDp = async(req , res)=>{
    try{
        let id = req.params.id
        let vendor = await Vendor.findById(id);
        if(!vendor){
            res.status(400).json({
                status : "Success",
                message : "Vendor Not Found"
            })
        }else{
            await cloudinary.uploader.destroy(vendor.profile_pic);
            await Vendor.findByIdAndUpdate({_id : id} , {profile_pic : null})
            res.status(200).json({
                status : "Success"
            })
        }
    }catch(err){
        res.status(500).json({
            status : "Failed",
            messgae : err.message
        })
    }
}

module.exports = {addSelectedList , delSelectedList,updateUserDp,deleteUserDp,updateVendorDp,deleteVendorDp}