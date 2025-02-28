const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    type: {
        type: String,
        enum: ["link", "shop"], // Ensures only 'social' or 'shop' can be used
        default: "link",
    },
    title: {
        type: String,
        required: function() { return this.type === 'link'; } // Required for social type only
    },
    url: {
        type: String,
        required: function() { return this.type === 'link'; } // Required for social type only
    },
    platform: {
        type: String, 
        enum: ["YouTube", "Facebook", "Instagram", "Other"],
        default: "Other",
        required: function() { return this.type === 'link'; } // Required for social type only
    },
    clicks: { type: Number, default: 0 },
    clickData: [{ date: { type: Date, default: Date.now } }],
   
    shopTitle: {
        type: String,
        required: function() { return this.type === 'shop'; } // Required only for shop type
    },
    shopUrl: {
        type: String,
        required: function() { return this.type === 'shop'; } // Required only for shop type
    },
    shopClicks: { type: Number, default: 0 },
    ctaClicks: { type: Number, default: 0 },

    createdAt: { type: Date, default: Date.now },
});

// Ensure shop fields are only present for type "shop"
linkSchema.pre('save', function(next) {
    if (this.type === "link") {
        this.shopTitle = undefined;
        this.shopUrl = undefined;
    } else if (this.type === "shop") {
        this.title = undefined;
        this.url = undefined;
        this.platform = undefined;
    }
    next();
});

const Link = mongoose.model("Link", linkSchema);
module.exports = Link;
