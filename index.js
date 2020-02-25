let express = require("express");
let app = express();
let mongoose = require("mongoose");
let fawn = require("fawn");
fawn.init(mongoose);
let port = process.env.PORT || 4600;
let movie = require("./routes/movie/movie");
let genre = require("./routes/movie/genre");
let stockmovie = require("./routes/transaction/movie");
let stockuser = require("./routes/transaction/user");
let usermoviestock = require("./routes/transaction/usermovie");
let file = require("./routes/fileupload");
//in-build middleware
app.use(express.json());
app.use("/uploads", express.static("uploads"));

mongoose
    .connect("mongodb://localhost/UDH", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log(`connected to db`))
    .catch(error => console.log(`something went wrong ${error.message}`));
app.listen(port, () => console.log(`connected to port`));

// mongoose
//     .connect("mongodb+srv://fulaji2512:<Password>@cluster0-igerj.mongodb.net/UDH?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log(`connected to db`))
//     .catch(error => console.log(`something went wrong ${error.message}`));
// app.listen(port, () => console.log(`connected to port`));

app.use("/api", movie);
app.use("/api", genre);
app.use("/api/stocks", stockmovie);
app.use("/api/stocks", stockuser);
app.use("/api/stocks", usermoviestock);
app.use("/fileupload", file);