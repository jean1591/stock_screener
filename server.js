const express = require("express");

const app = express();

app.get("/api/v1/", (req, res) => {
	res.status(200).json({ success: true });
});

// Define Routes
app.use("/api/v1/stocks", require("./routes/stocks"));

const PORT = 5000;

app.listen(PORT, console.log(`Server Running on port ${PORT}`));
