const express = require("express");
const cors = require('cors');
const app = express();
const axios = require("axios");

app.use(cors());

app.get("/api/data",async(req,res)=>{
    const url = 'https://gist.githubusercontent.com/cpal39/7081859ea04b90ac2522e84ea6189f3b/raw/4814c4eb63ecfbdd5bcc32a20bf4c9cb72aa0f2e/data.json';
	try{
		const {data}=await axios.get(url);
        res.status(200).json(data);
	}
	catch(e){
		res.status(404);
	}
});

app.use("*", (req, res) => {
	res.status(404).json({ error: "Not found" });
});

app.listen(5000, () => {
	console.log("We've now got a server!");
	console.log("Your routes will be running on http://localhost:5000");
});
