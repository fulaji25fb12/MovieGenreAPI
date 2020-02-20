let express = require("express");
let router = express.Router();
let Joi = require("@hapi/joi");
let movie = require("../../dbModel/transaction/movie");

router.post("/movie", async(req,res) => {
    let {error} = movieValidation(req.body);
    if(error){return res.send(error.details[0].message)};
    let data = new movie.movieModel({
        name: req.body.name,
        actor: req.body.actor,
        price: req.body.price,
        stocks: req.body.stocks
    });
    let item = await data.save();
    res.send(item);
});

function movieValidation(error){
    let schema = Joi.object({
        name: Joi.string().required(),
        actor: Joi.string().required(),
        price: Joi.number().required(),
        stocks: Joi.number().required()
    });
    return schema.validate(error);
};

module.exports = router;