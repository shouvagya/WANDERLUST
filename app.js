const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Listing=require("./models/listing.js");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const wrapAsync=require("./utils/wrapAsync.js");
const ExpressError=require("./utils/ExpressError.js");
const Review=require("./models/review.js");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));


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




//---------------//
//Index route
app.get("/listings",wrapAsync(async (req,res)=>{
    const allListings=await Listing.find({});
    res.render("./listings/index.ejs",{allListings});

}));


//----------------//
//new route
app.get("/listings/new",(req,res)=>{
    res.render("./listings/new.ejs");
});



//----------------//
//show route
app.get("/listings/:id",wrapAsync(async (req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("./listings/show.ejs",{listing});

}));



//-----------------//
//Create route
app.post("/listings",wrapAsync(async (req,res,next)=>{
    // Set default image if empty
    if (!req.body.listing.image || !req.body.listing.image.url || req.body.listing.image.url.trim() === "") {
        req.body.listing.image = {
            url: "https://plus.unsplash.com/premium_photo-1752434963661-a52972dc8f07?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            filename: "default"
        };
    }
    const newListing=new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
}));


//-----------------//
//edit route
app.get("/listings/:id/edit",wrapAsync(async (req,res)=>{
    let {id}=req.params;
    let listing=await Listing.findById(id);
    res.render("./listings/edit.ejs",{listing});
}));


//-------------------//
//update route
app.put("/listings/:id",wrapAsync(async (req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listings/${id}`);
}));


//-----------------------//
//delete route
app.delete("/listings/:id",wrapAsync(async(req,res)=>{
    let {id}=req.params;
    let deletedListing=await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
}));



//-----------------------//
//Reviews
//Post route
app.post("/listings/:id/reviews",async(req,res)=>{
    let listing=await Listing.findById(req.params.id);
    let newReview=new Review(req.body.review);
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();

    res.redirect(`/listings/${listing._id}`);

})


//error handling
// app.all("*",(req,res,next)=>{
//     console.log("404 for URL:", req.originalUrl);
//     next(new ExpressError(404,"Page not found"));
// });
// app.all("*", (req, res) => {
//     res.status(404).render("error", { statusCode: 404, message: "Page not found" });
// });
app.use((err,req,res,next)=>{
    console.log(err);
    let {statusCode=500,message="Something went wrong"}=err;
    res.status(statusCode).send(message);
});



//--------------//
// app.get("/testListing",async (req,res)=>{
//     let sampleListing=new Listing({
//         title:"My new Villa",
//         description:"By the beach",
//         price:1200,
//         location:"Calangute,Goa",
//         country:"India"
//     });
//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("successfull test");
// });


app.listen(8080,()=>{
    console.log("server is listening at port 8080");
});

app.get("/",(req,res)=>{
    res.send("Hi i am root.");
});