const express=require("express");
const mongoose=require("mongoose");
const bodyparser=require("body-parser");
const path = require("path");

const connectiontoDB=require("./connectiontoDB");
const app=express();
const port=5000;

//Database Connection Initialisation
connectiontoDB();


//Middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static(path.join("frontend")));

//Mongoose Schemas
// Admin User Schema
const Admin = mongoose.Schema({
    adminname: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true, // Ensure the username is unique
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensure the email is unique
    },
    securityquestion: {
        type: String,
        required: true,
    },
    securityanswer: {
        type: String,
        required: true,
    },
    uniquekey: {
        type: String,
        required: true,
    }
}, { collection: "Admin" });

const AdminUser = mongoose.model("AdminUser", Admin);
//Vehicle Details Schema
const Vehicle=mongoose.Schema({
        vehicleName: {
            type: String,
            required: true,
        },
        fuelUsed: {  // Updated key to match the backend
            type: String,
            required: true,
            default: "Petrol"
        },
        registrationNumber: {
            type: String,
            required: true,
        },
        registrationYear: {
            type: String,
            required: true,
        },
        color: {
            type: String,
            required: true,
        },
        tyres: {
            type: String,
            required: true,
            default: 2
        },
        ownerName: {
            type: String,
            required: true,
        },
        ownerNumber: {
            type: Number,
            required: true,
        },
        ownerAddress: {
            type: String,
            required: true,
        },
        ownerPhone: {
            type: String,
            required: true,
        },
        chassisNumber: {
            type: String,
            required: true,
            unique: true,
        }
    });
    

const Vehicles=mongoose.model("Vehicles",Vehicle);

//Direction Route
app.get('/', async (req, res) => {
    try {
        const recordExists = await AdminUser.exists({}); // Check if any record exists in the collection

        if (recordExists) {
            // If a record exists, serve the login page
            return res.sendFile(path.join(__dirname, "frontend", "login", "login.html"));
        } 
        
        // If no records exist, serve the admin registration page
        res.sendFile(path.join(__dirname,"frontend","login","AdminRegistration.html"));
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});









//GET Routes
app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"frontend","login","AdminRegistration.html"));
});
app.get("/home",(req,res)=>{
    res.sendFile(path.join(__dirname,"frontend","admindashboard","admindashboard.html"));
})
app.get("/login",(req,res)=>{
    res.sendFile(path.join(__dirname,"frontend","login","login.html"));
})
app.get("/login/askbeforepass/forgotdetails",(req,res)=>{
    res.sendFile(path.join(__dirname,"frontend","login","askbeforepass.html"));
})
app.get("/login/forgotdetails",(req,res)=>{
    res.sendFile(path.join(__dirname,"frontend","login","resetadmindetails.html"));
})
app.get("/dashboard",(req,res)=>{
    res.sendFile(path.join(__dirname,"frontend","admindashboard.html"));
});
app.get("/home/registernewvehicle",(req,res)=>{
    res.sendFile(path.join(__dirname,"frontend","C","registernewvehicle.html"));
})
app.get("/home/getvehicledetails",(req,res)=>{
    res.sendFile(path.join(__dirname,"frontend","admindashboard","ReadOperation.html"));
});
app.get("/home/getvehicledetails/bycolor",(req,res)=>{
    res.sendFile(path.join(__dirname,"frontend","R","getvehicledetailsbycolor.html"));
});
app.get("/home/getvehicledetails/byfuelUsed",(req,res)=>{
    res.sendFile(path.join(__dirname,"frontend","R","getvehicledetailsbyfuelused.html"));
});
app.get("/home/getvehicledetails/byname",(req,res)=>{
    res.sendFile(path.join(__dirname,"frontend","R","getvehicledetailsbyname.html"));
});
app.get("/home/getvehicledetails/bytyres",(req,res)=>{
    res.sendFile(path.join(__dirname,"frontend","R","getvehicledetailsbynooftyres.html"));
});
app.get("/home/getvehicledetails/byownernumber",(req,res)=>{
    res.sendFile(path.join(__dirname,"frontend","R","getvehicledetailsbyownernumber.html"));
});
app.get("/home/getvehicledetails/byownermobilenumber",(req,res)=>{
    res.sendFile(path.join(__dirname,"frontend","R","getvehicledetailsbyownersmobilenumber.html"));
});
app.get("/home/getvehicledetails/byownername",(req,res)=>{
    res.sendFile(path.join(__dirname,"frontend","R","getvehicledetailsbyownersname.html"));
});
app.get("/home/getvehicledetails/byregistrationnumber",(req,res)=>{
    res.sendFile(path.join(__dirname,"frontend","R","getvehicledetailsbyregistrationnumber.html"));
});
app.get("/home/getvehicledetails/byregistrationyear",(req,res)=>{
    res.sendFile(path.join(__dirname,"frontend","R","getvehicledetailsbyregistrationyear.html"));
});
app.get("/home/getvehicledetails/bychassisnumber",(req,res)=>{
    res.sendFile(path.join(__dirname,"frontend","R","getvehicledetailsybychassisnumber.html"));
});
app.get("/login",(req,res)=>{
    res.sendFile(path.join(__dirname,"frontend","login","login.html"));
})
app.get("/login/askbeforepass/forgotdetails",(req,res)=>{
    res.sendFile(path.join(__dirname,"frontend","login","askbeforepass.html"));
})
app.get("/login/forgotdetails",(req,res)=>{
    res.sendFile(path.join(__dirname,"frontend","login","resetadmindetails.html"));
})
app.get("/home/updatedetails",(req,res)=>{
    res.sendFile(path.join(__dirname,"frontend","Admindashboard","UpdateOperations.html"));
});
app.get("/home/updatedetails/number",(req,res)=>{
    res.sendFile(path.join(__dirname,"frontend","U","updateregistrationnumber.html"));
});
app.get("/home/updatedetails/ownername",(req,res)=>{
    res.sendFile(path.join(__dirname,"frontend","U","updateownername.html"));
});
app.get("/home/updatedetails/ownerphonenumber",(req,res)=>{
    res.sendFile(path.join(__dirname,"frontend","U","updateownerphonenumber.html"));
});
app.get("/home/updatedetails/color",(req,res)=>{
    res.sendFile(path.join(__dirname,"frontend","U","updatevehiclecolor.html"));
});
app.get("/home/updatedetails/address",(req,res)=>{
    res.sendFile(path.join(__dirname,"frontend","U","updateowneraddress.html"));
});
app.get("/deletevehicle",(req,res)=>[
    res.sendFile(path.join(__dirname,"frontend","D","deletethevehicle.html"))
])


//Authentication Routes
//Registes the Admin
app.post("/register", async (req, res) => {
    const { adminname, username, password, email, securityquestion, securityanswer, uniquekey } = req.body;

    try {
        // Check if an admin already exists
        const adminExists = await AdminUser.findOne({});
        if (adminExists) {
            // If an admin exists, return an error
            return res.redirect("/login?error=Admin already exists");
        }

        // Create a new AdminUser if no admin exists
        const newAdmin = new AdminUser({
            adminname,
            username,
            password,
            email,
            securityquestion,
            securityanswer,
            uniquekey
        });

        // Save the new AdminUser
        await newAdmin.save();

        // Redirect to login or another page
        res.send(`
            <script>
                alert("Admin Assigned successfully!");
                window.location.href = "/login";
            </script>
        `);
    } catch (err) {
        console.error("Error registering admin:", err);
        res.status(500).send("Internal Server Error");
    }
});
//Reset Admin Details
app.post("/login/resetadmindetails", async (req, res) => {
    const { adminname, username, password, email, securityquestion, securityanswer, uniquekey } = req.body;

    try {
        // Find the existing admin (since there's only one admin)
        const adminExists = await AdminUser.findOne({});

        if (!adminExists) {
            // No admin found, handle accordingly
            return res.status(404).send("Admin not found");
        }

        // Update the admin's details
        adminExists.adminname = adminname;
        adminExists.username = username;
        adminExists.password = password;
        adminExists.email = email;
        adminExists.securityquestion = securityquestion;
        adminExists.securityanswer = securityanswer;
        adminExists.uniquekey = uniquekey;

        // Save the updated admin
        await adminExists.save();

        // Send a script to the client that will show an alert and redirect the user
        res.send(`
            <script>
                alert("Admin details updated successfully!");
                window.location.href = "/login";
            </script>
        `);
    } catch (err) {
        console.error("Error updating admin details:", err);
        res.status(500).send("Internal Server Error");
    }
});
//Admin Login
app.post("/Adminlogin", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        const userExists = await AdminUser.findOne({ username: username, password: password });
        
        if (userExists) {
            // User found, proceed with your logic (e.g., sending a response)
            res.send(`
                <script>
                    alert("Admin Login Success!");
                    window.location.href = "/home";
                </script>
            `);
        } else {
            // User not found, handle accordingly
            res.send(`
                <script>
                    alert("Admin Login Unsuccessfull , Try Again!");
                    window.location.href = "/login";
                </script>
            `);
        }
    } catch (error) {
        // Handle any errors that occur during the database query
        res.send(`<script>alert("Error Occured") window.location.href="/"</script>`);
    }
});
//Check and Pass
app.post("/checkandpass", async (req, res) => {
    try{
        const {UniqueKey}=req.body;
        const userExists = await AdminUser.findOne({ uniquekey: UniqueKey });
        if (userExists) {
            // User found, proceed with your logic (e.g., sending a response)
            res.send(`
                <script>
                alert("Success!")
                    window.location.href = "/login/forgotdetails";
                </script>
            `);
        } else {
            // User not found, handle accordingly
            res.send(`
                <script>
                    alert("Try Again!");
                    window.location.href = "/";
                </script>
            `);
        }
    }catch(err){

    }
})







//C Routes
//Register a New Vehicle
app.post("/home/registernewvehicle/save", async (req, res) => {
    try {
        const {
            vehicleName, fuelUsed, registrationNumber, registrationYear,
            color, tyres, ownerName, ownerNumber, ownerAddress,
            ownerPhone, chassisNumber
        } = req.body;

        const ifVehicleExists = await Vehicles.findOne({ registrationNumber });

        if (ifVehicleExists) {
            return res.redirect("/home/registernewvehicle?error=Vehicle with Same Registration Number Already Exists");
        }

        const newVehicle = new Vehicles({
            vehicleName, fuelUsed, registrationNumber, registrationYear,
            color, tyres, ownerName, ownerNumber, ownerAddress,
            ownerPhone, chassisNumber
        });

        await newVehicle.save();        
        return res.redirect("/home?success=Vehicle Registered Successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});



//R Routes
//Get Vehicle Details by Vehicle Name
app.post("/getvehicledetailsbyvehiclename", async (req, res) => {
    try {
        const { vehicleName } = req.body;

        // Use a case-insensitive regular expression to match the vehicleName anywhere in the field
        const vehicles = await Vehicles.find({
            vehicleName: { $regex: vehicleName, $options: 'i' } // 'i' for case-insensitive matching
        });

        if (vehicles.length > 0) {
            return res.json(vehicles); // Return the array of vehicles
        } else {
            return res.status(404).json({ message: "No vehicles found with the specified Vehicle Name" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

//Get Vehicle details by Fuel Used
app.post("/getvehicledetailsbyfuelused",async(req,res)=>{
    try{
        const {fuelUsed}=req.body;
        const vehicles=await Vehicles.find({fuelUsed});
        if (vehicles.length > 0) {
            return res.json(vehicles); // Return the array of vehicles
        } else {
            return res.status(404).json({ message: "No vehicles found with the specified Fuel type" });
        }
    }catch(err){
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

//Get Vehicle Details by its Registration Number
app.post("/getvehicledetailsbyregistrationnumber", async (req, res) => {
    try {
        const { registrationNumber } = req.body;

        // Find vehicles with a partial match
        const vehicles = await Vehicles.find({
            registrationNumber: { $regex: registrationNumber, $options: 'i' }
        });

        if (vehicles.length > 0) {
            // Sort vehicles: exact matches first, then partial matches sorted by the position of the match
            vehicles.sort((a, b) => {
                const aIndex = a.registrationNumber.toLowerCase().indexOf(registrationNumber.toLowerCase());
                const bIndex = b.registrationNumber.toLowerCase().indexOf(registrationNumber.toLowerCase());

                // Exact matches come first
                if (aIndex === 0 && bIndex !== 0) return -1;
                if (bIndex === 0 && aIndex !== 0) return 1;

                // If both are partial matches, sort by the position of the match
                return aIndex - bIndex;
            });

            return res.json(vehicles); // Return the array of sorted vehicles
        } else {
            return res.status(404).json({ message: "No vehicles found with the specified Registration Number" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});



//Get Vehicle Details by their Registration Year
app.post("/getvehicledetailsbyregistrationyear",async(req,res)=>{
    try {
        const { registrationYear } = req.body;

        // Find vehicles with a partial match
        const vehicles = await Vehicles.find({
            registrationYear: { $regex: registrationYear, $options: 'i' }
        });

        if (vehicles.length > 0) {
            // Sort vehicles: exact matches first, then partial matches sorted by the position of the match
            vehicles.sort((a, b) => {
                const aIndex = a.registrationYear.toLowerCase().indexOf(registrationYear.toLowerCase());
                const bIndex = b.registrationYear.toLowerCase().indexOf(registrationYear.toLowerCase());

                // Exact matches come first
                if (aIndex === 0 && bIndex !== 0) return -1;
                if (bIndex === 0 && aIndex !== 0) return 1;

                // If both are partial matches, sort by the position of the match
                return aIndex - bIndex;
            });

            return res.json(vehicles); // Return the array of sorted vehicles
        } else {
            return res.status(404).json({ message: "No vehicles found with the specified Year of Registration " });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
})

//Get the Vehicle Details by thier Color
// Get Vehicle Details by Color
app.post("/getvehicledetailsbycolor", async (req, res) => {
    try {
        const { color } = req.body;
        const vehicles = await Vehicles.find({ color }); // Use find to get all vehicles with the specified color

        if (vehicles.length > 0) {
            return res.json(vehicles); // Return the array of vehicles
        } else {
            return res.status(404).json({ message: "No vehicles found with the specified color" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

//Get the Vehicle Details by the No of tyres
app.post("/getvehicledetailsbytyres",async(req,res)=>{
    try{
        const {tyres}=req.body;
        const vehicles=await Vehicles.find({tyres});
        if (vehicles.length > 0) {
            return res.json(vehicles); // Return the array of vehicles
        } else {
            return res.status(404).json({ message: "No vehicles found with the specified Tyre configuration" });
        }
    }catch(err){
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});
//Get the Vehicle Details by the Owner Name
app.post("/getvehicledetailsbyownername",async(req,res)=>{
    try{
        const { ownerName } = req.body;

        // Use a case-insensitive regular expression to match the vehicleName anywhere in the field
        const vehicles = await Vehicles.find({
            ownerName: { $regex: ownerName, $options: 'i' } // 'i' for case-insensitive matching
        });

        if (vehicles.length > 0) {
            return res.json(vehicles); // Return the array of vehicles
        } else {
            return res.status(404).json({ message: "No vehicles found with the specified Owner's Name" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});
//Get the Vehicle details by Owner number
app.post("/getvehicledetailsbyownernumber",async(req,res)=>{
    try{
        const {ownerNumber}=req.body;
        const vehicles=await Vehicles.find({ownerNumber});
        if (vehicles.length > 0) {
            return res.json(vehicles); // Return the array of vehicles
        } else {
            return res.status(404).json({ message: "No vehicles found with the specified Owner Number" });
        }
    }catch(err){
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

//get the Vehicle details by owners mobile number
app.post("/getvehicledetailsbyownerphone",async(req,res)=>{
    try{
        const {ownerPhone}=req.body;
        const vehicles=await Vehicles.find({ownerPhone});
        if (vehicles.length > 0) {
            return res.json(vehicles); // Return the array of vehicles
        } else {
            return res.status(404).json({ message: "No vehicles found with the specified Owner's Registered Mobile Number" });
        }
    }catch(err){
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
})
//Get teh vehicle Details by Chassis Number
app.post("/getvehicledetailsbychassisnumber",async(req,res)=>{
    try{
        const {chassisNumber}=req.body;
        const vehicles=await Vehicles.find({chassisNumber});
        if (vehicles.length > 0) {
            return res.json(vehicles); // Return the array of vehicles
        } else {
            return res.status(404).json({ message: "No vehicles found with the specified Chassis Number" });
        }
    }catch(err){
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
})

//Update Routes
//Update Vehicle's Registration Number
app.post("/updatedetails/updateregistrationnumber", async (req, res) => {
    try {
        const { registrationNumber, newRegistrationNumber } = req.body;

        const vehicle = await Vehicles.findOne({ registrationNumber });

        if (vehicle) {
            vehicle.registrationNumber = newRegistrationNumber;

            // Save the updated vehicle back to the database
            await vehicle.save();

            res.send(`
                <script>
                    alert("Registration Number Updated Successfully!");
                    window.location.href = "/home";
                </script>
            `);
        } else {
            res.status(404).json({ message: "Vehicle not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

//Update Vehicle Owner Name
app.post("/updatedetails/updateownername", async (req, res) => {
    try {
        const { registrationNumber, newOwnerName } = req.body;

        const vehicle = await Vehicles.findOne({ registrationNumber });

        if (vehicle) {
            vehicle.ownerName = newOwnerName;
            vehicle.ownerNumber=vehicle.ownerNumber+1;

            // Save the updated vehicle back to the database
            await vehicle.save();

            res.send(`
                <script>
                    alert("Owner Updated Successfully!");
                    window.location.href = "/home";
                </script>
            `);
        } else {
            res.status(404).json({ message: "Vehicle not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

//Update the Vehicle Owners Registered Mobile Number
app.post("/updatedetails/updateownerphone", async (req, res) => {
    try {
        const { registrationNumber, newphonenumber } = req.body;

        const vehicle = await Vehicles.findOne({ registrationNumber });

        if (vehicle) {
            vehicle.ownerPhone=newphonenumber;

            // Save the updated vehicle back to the database
            await vehicle.save();

            res.send(`
                <script>
                    alert("Registered Mobile Number Updated Successfully!");
                    window.location.href = "/home";
                </script>
            `);
        } else {
            res.status(404).json({ message: "Vehicle not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

//Update the Vehicle's Color
app.post("/updatedetails/updatecolor", async (req, res) => {
    try {
        const { registrationNumber, newcolor } = req.body;

        const vehicle = await Vehicles.findOne({ registrationNumber });

        if (vehicle) {
            vehicle.color=newcolor;

            // Save the updated vehicle back to the database
            await vehicle.save();

            res.send(`
                <script>
                    alert("Color of the Vehicle Updated Successfully!");
                    window.location.href = "/home";
                </script>
            `);
        } else {
            res.status(404).json({ message: "Vehicle not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});
//Update the Owners Addresss
app.post("/updatedetails/updateaddress", async (req, res) => {
    try {
        const { registrationNumber, newaddress } = req.body;

        const vehicle = await Vehicles.findOne({ registrationNumber });

        if (vehicle) {
            vehicle.ownerAddress=newaddress;

            // Save the updated vehicle back to the database
            await vehicle.save();

            res.send(`
                <script>
                    alert("Address Of the Vehicle Updated Successfully!");
                    window.location.href = "/home";
                </script>
            `);
        } else {
            res.status(404).json({ message: "Vehicle not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

//Delete the Vehicle from the Database
app.post("/deletevehicle", async (req, res) => {
    try{
        const { registrationNumber } = req.body;

        const vehicle = await Vehicles.findOne({ registrationNumber });
        if (vehicle) {
            res.send(`
                <script>
                    alert("Are you Sure you Want to Delete this Vehicle from the Records?");
                    alert("Vehicle Delete From the Records");
                    window.location.href = "/home";
                </script>
            `);
            await Vehicles.deleteOne({ registrationNumber });
        }
    }catch(err){}
});
















//Listening to port
app.listen(port,(req,res)=>{
    console.log(`server is running on port ${port}`);
})