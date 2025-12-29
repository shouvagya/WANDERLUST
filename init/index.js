const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing=require("../models/listing.js");

const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";

main()
.then(()=>{
    console.log("connected to DB");
})
.catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect(MONGO_URL);
}

const initDB=async()=>{
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=> ({...obj,owner:'6933c5fd3cd2f8e7f4bcf85a'}));
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