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
                default: "https://plus.unsplash.com/premium_photo-1752434963661-a52972dc8f07?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                set: (v) => v === "" ? "https://plus.unsplash.com/premium_photo-1752434963661-a52972dc8f07?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D": v
            }            
        },
        price:Number,
        location:String,
        country:String,
        reviews:[
            {
                type:Schema.Types.ObjectId,
                ref:"Review",
            }
        ]
    }
);

const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;