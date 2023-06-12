
const Proposals = require('../models/proposal');
const cloudinary = require('../middleware/cloudinary');
const User = require('../models/user');
const Vendor = require('../models/vendor');




// This function getAllProposals retrieves all proposals 
// from the database using the Proposals model. It populates the vendorId field 
// using the populate method to fetch the associated vendor details.
//  The retrieved proposals are then returned as a JSON response.

const getAllproposal= async (req,res)=>{
    try{

        let proposals= await Proposal.find().populate("VendorId")
        res.status(200).json({status:"success",data:proposals})
    }
    catch(err){
        res.status(400).json({status:"failed",message:err.message})
    }
}

//Create a proposal

//The createProposal function handles the creation of a new proposal. 
//It extracts the file paths from the request files object and uploads the files to the cloudinary
// service using the cloudinary.uploader.upload method. The resulting secure URLs are stored in 
//the images field of the proposal object. 
//The proposal is then saved to the database and returned as a JSON response.


const createProposal = async (req, res) => {
    try {
      let arr = [];
      console.log(req.files);
      arr = await req.files.map((file) => file.path);
      for (let i = 0; i < arr.length; i++) {
        let imgUrl = await cloudinary.uploader.upload(arr[i]);
        arr[i] = imgUrl.secure_url;
      }
      let proposal = new Proposals({
        ...req.body,
        images: arr,
      });
      await proposal.save();
      res.status(200).json({
        status: "Success",
        data: proposal,
      });
    } catch (err) {
      res.status(500).send(err.message);
    }
  };
  
  //Edit proposal

  //The editProposal function handles the updating of an existing proposal. 
  //It first checks if the proposal with the given ID exists. If not, 
  //it returns a JSON response indicating an invalid ID. If there are files in the request,
  // it uploads them to cloudinary and updates the images field in the proposal object.
  // The proposal is then updated and returned as a JSON response.
  

  const editProposal = async (req, res) => {
    try {
      let proposals = await Proposals.findById(req.params.id);
      if (!proposals)
        return res.status(404).json({ status: 'Failed', message: 'Invalid Id' });
      if (req.files && req.files.length > 0) {
        const arr = req.files.map((file) => file.path);
        for (let i = 0; i < arr.length; i++) {
          let imgUrl = await cloudinary.uploader.upload(arr[i]);
          arr[i] = imgUrl.secure_url;
        }
        proposals = await Proposals.findByIdAndUpdate(
          req.params.id,
          { ...req.body, images: [...arr] },
          { new: true }
        );
      } else {
        proposals = await Proposals.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
        );
      }
      res.status(200).json({ status: 'Success', proposals });
    } catch (err) {
      res.status(500).json({ status: 'Failed', message: err.message });
    }
  };


  //DElete proposal
  //The deleteProposal function handles the deletion of a proposal.
  // It first retrieves the proposal with the given ID and checks if it exists.
  // If not, it returns a JSON response indicating an invalid ID. If the proposal exists, 
  //it is deleted from the database, and a success JSON response is returned.
  //
  //

  const deleteProposal = async (req, res) => {
    try {
      const id = req.params.id;
      let post = await Proposals.findById(id);
      if (!post)
        return res.status(400).json({
          status: 'Failed',
          message: 'Id is invalid',
        });
      else {
        await Proposals.findByIdAndDelete(id);
      }
      res.status(200).json({
        status: 'Success',
      });
    } catch (err) {
      res.status(500).send({
        status: 'Failed',
        message: err.message,
      });
    }
  };
  //GET PROPOSALS SELECTED BY THE USER
const getUserSelectedProposals = async (req, res) => {
  try {
      let id = req.params.id;
      let user = await User.findById(id);
      let proposals = [];
      for (let i = 0; i < user.selected_items.length; i++) {
          let proposal = await Proposals.findById(user.selected_items[i]).populate("vendorId");
          if (proposal) proposals.push(proposal);
      }
      res.status(200).json({
          status: "Success",
          data: proposals
      })
  } catch (err) {
      res.status(500).json({
          status: "Failed",
          message: err.message
      })
  }
}

//GET VENDOR SPECIFIC PROPOSALS
const vendorProposals = async (req, res) => {
  try {
      let proposals = await Proposals.find({ vendorId: req.params.id });
      res.status(200).json({
          status: "Success",
          data: proposals
      })
  } catch (err) {
      res.status(500).json({
          status: "Failed",
          message: err.message
      })
  }
}

//GET SINGLE PROPOSALS BY ID
const getSingleProposal = async (req, res) => {
  try {
      let id = req.params.id;
      let proposal = await Proposals.findById(id).populate("vendorId");
      res.status(200).json({
          status: "Success",
          data: proposal
      })
  } catch (err) {
      res.status(500).json({
          status: "Failed",
          message: err.message
      })
  }
}

module.exports = { getAllproposal, createProposal, editProposal, deleteProposal, getUserSelectedProposals, vendorProposals, getSingleProposal }


  
  
  
  
  
  
  



