const Link = require('../schema/links.schema')

//  Add a new link (Social or Shop)
exports.addLink = async (req, res) => {
    try {
        let { type, title, url, platform, shopTitle, shopUrl } = req.body;


        // // Default type is "social" if not provided
        // if (!type) {
        //     type = "social";
        // }
        
        // if (!title || !url) {
        //     return res.status(400).json({ message: "All fields are required" });
        // }

        // const newLink = new Link({
        //     user: req.user.id,
        //     type,
        //     title,
        //     url,
        //     platform,
        //     shopTitle,
        //     shopUrl,
        // });

        if (type === "link" && (!title || !url || !platform)) {
            return res.status(400).json({ error: "Social link requires title, url, and platform." });
        }

        if (type === "shop" && (!shopTitle || !shopUrl)) {
            return res.status(400).json({ error: "Shop link requires shopTitle and shopUrl." });
        }

        const newLink = new Link({
            user: req.user.id, // Assuming authentication middleware adds user id
            type,   
            ...(type === "link"
                ? { title, url, platform }
                : { shopTitle, shopUrl })
        });


        await newLink.save();
        res.status(201).json(newLink);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};


//  Get all links for logged-in user
exports.getLinks = async (req, res) => {
    try {
        const links = await Link.find({ user: req.user.id });
        res.status(200).json(links);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

//  Update a link
exports.updateLink = async (req, res) => {
    try {
        const { type, title, url, platform, shopTitle, shopUrl } = req.body;
        const link = await Link.findById(req.params.id);

        if (!link) {
            return res.status(404).json({ message: "Link not found" });
        }

        if (link.user.toString() !== req.user.id) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // const { title, url, platform } = req.body;
        // link.title = title || link.title;
        // link.url = url || link.url;
        // link.platform = platform || link.platform;
        // link.shopTitle = shopTitle || link.shopTitle;
        // link.shopUrl = shopUrl || link.shopUrl;

        // Prevent modification of social fields when updating a shop
        if (link.type === "shop") {
            link.shopTitle = shopTitle || link.shopTitle;
            link.shopUrl = shopUrl || link.shopUrl;
        } else if (link.type === "link") {
            link.title = title || link.title;
            link.url = url || link.url;
            link.platform = platform || link.platform;
        }

        await link.save();
        res.status(200).json({ message: "Link updated successfully", link });
    } catch (error) {
        res.status(500).json({ message: "Error updating link." });
    }
};

exports.deleteLink = async (req, res) => {
    try {
        // Find link by ID
        const link = await Link.findById(req.params.id);

        if (!link) {
            return res.status(404).json({ message: "Link not found" });
        }

        // Ensure the logged-in user owns the link
      
        if (link.user.toString() !== req.user.id) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // Delete the link
        await Link.deleteOne();
        res.status(200).json({ message: "Link deleted successfully" });
    } catch (error) {
        console.error("Delete Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.handleRedirect = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("Redirecting for link ID:", id);

        // Find the link by ID
        const link = await Link.findById(id);
        if (!link) {
            return res.status(404).json({ message: "Link not found" });
        }

        let redirectUrl = link.url; // Default to `url` (for social type)

        // If it's a shop type, use `shopUrl` instead
        if (link.type === "shop" && link.shopUrl) {
            redirectUrl = link.shopUrl;
        }

        // Ensure the URL is valid
        if (!redirectUrl.startsWith("http")) {
            return res.status(400).json({ message: "Invalid URL format" });
        }

        // Increment click count based on type
        if (link.type === "shop") {
            link.shopClicks += 1; // Track shop-specific clicks
        } else {
            link.clicks += 1; // Track normal link clicks
        }

        // Add new click record with date
        link.clickData.push({ date: new Date() });
        await link.save();

        // Redirect to the actual URL
        return res.status(302).redirect(redirectUrl);

    } catch (error) {
        console.error("Redirect error:", error);
        return res.status(500).json({ message: "Server error" });
    }
};


// exports.handleRedirect = async (req, res) => {
//     try {
//         const { id } = req.params;
//         console.log(id)
//         // Find link by ID
//         const link = await Link.findById(id);
//         if (!link) {
//             return res.status(404).json({ message: "Link not found" });
//         }   

//         // Add new click record with date
//         link.clickData.push({ date: new Date() });
      
//         // Increment click count
//         link.clicks += 1;
//         await link.save();

//         // Redirect to the actual URL
//         res.redirect(link.url);
//     } catch (error) {
//         console.log("error",error)
//         res.status(500).json({ message: "Server error" });
//     }
// };