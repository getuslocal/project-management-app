const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config();
const uri = process.env.ATLAS_URI;

const connectDB = async () => {
	try {
		await mongoose.connect(uri, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true
		});

		console.log('MongoDB Connected...');
	} catch (err) {
		console.error(err.message);
		// Exit process with failure
		process.exit(1);
	}
};

module.exports = connectDB;
