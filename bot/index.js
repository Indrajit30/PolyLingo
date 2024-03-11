const express = require("express");
const app = express();

app.use(
	cors({
		origin: process.env.REACT_URL,
		credentials: true,
	})
);

app.get("/bot-res", (req, res) => {
	try {
		const { qurey } = req.body;

		if (!qurey) {
			return res.status(400).json({
				success: flase,
				message: "Please enter query",
			});
		}


    const respBot=''

		return res.status(201).json({
      success: true,
      data:respBot
		});
  } catch (error) {
    console.log(error);
		return res.status(500).json({
			success: false,
			message: "Bot is busy ask after  some time!",
		});
  }
});
