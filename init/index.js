const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing=require("../models/listing.js");
require("dotenv").config({ path: "../.env" });

//const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";
const dbUrl=process.env.ATLASDB_URL

main()
.then(()=>{
    console.log("connected to DB");
})
.catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect(dbUrl);
}

const initDB=async()=>{
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=> ({...obj,owner:"69522f7034e2699a94778ec3"}));
    const categories = [
        "Trending",
        "Mountains",
        "Amazing Pools",
        "Domes",
        "Camping",
        "Arctic",
        "Iconic Cities",
        "Boats",
        "Castles",
        "Farms",
        "Rooms"
    ];

    initData.data = initData.data.map((obj, index) => ({
    ...obj,
    category: categories[index % categories.length]
    }));

    await Listing.insertMany(initData.data);
    console.log("data was iniitialized");
};

initDB();


