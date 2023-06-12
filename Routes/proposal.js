const router = require('express').Router();
const multer = require('../middleware/multer')
const {getAllproposal , createProposal , editProposal , deleteProposal , getUserSelectedProposals ,vendorProposals, getSingleProposal} = require('../controller/proposalcontroller')
const  {vendorAuthentication , userAuthentication} = require('../middleware/authentication')

router.post('/proposal' ,multer.array('images') , createProposal);
router.get('/proposals'  , getAllproposal);
router.put('/:id' , multer.array("images"),editProposal);
router.post('/:id' ,vendorAuthentication ,deleteProposal);
router.get('/selected/:id' , getUserSelectedProposals);
router.get('/proposal/vendor/:id',vendorAuthentication ,vendorProposals );
router.get('/proposal/:id' , getSingleProposal)
module.exports = router