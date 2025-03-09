const mongoose = require("mongoose");

const siteDataSchema = new mongoose.Schema ({

siteTitle: {
  type:String,
  required:true,
},
siteType: { type: String, 
  required: true
 },
rows: { type: Array, 
  required: true
 } // Store table data
}, 
{ timestamps: true }
);



const SiteData = mongoose.model("SiteData",siteDataSchema);
module.exports = SiteData;