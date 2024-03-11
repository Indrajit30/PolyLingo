const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
	mongoose
		.connect(process.env.MONGODB_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => console.log("DB Connected successfully"))
		.catch((error) => {
			console.log("Db Connection failed");
			console.log(error);
			process.exit(1);
		});
};
