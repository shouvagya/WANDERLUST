const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const listingSchema=new Schema(
    {
        title:{
            type:String,
            required:true,
        },
        description:String,
        image:{
            filename: String,
            url: {
                type: String,
                default: "https://unsplash.com/photos/hand-holding-a-delicious-bitten-cinnamon-roll-ovR_fTYcqa0",
                set: (v) => v === "" ? "https://unsplash.com/photos/hand-holding-a-delicious-bitten-cinnamon-roll-ovR_fTYcqa0" : v
            }            
        },
        price:Number,
        location:String,
        country:String,
    }
);

const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;