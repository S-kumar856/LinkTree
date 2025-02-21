const express = require('express')
const { addLink, getLinks, updateLink, deleteLink, handleRedirect }  = require('../controllers/links.controller');
const Auth = require('../middlewares/AuthMiddlewares');

const router = express.Router();

// Create a new link
router.post("/addlink", Auth, addLink);

// Get all links for a user
router.get("/getlink", Auth, getLinks);

// Update a link
router.put("/updatelink/:id", Auth, updateLink);

// Delete a link
router.delete("/deletelink/:id", Auth, deleteLink);

// redirect to the link
router.get("/redirect/:id", handleRedirect);

module.exports = router;