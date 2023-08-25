const { Router } = require("express");
const { authenticate } = require("../Middlewares/authenticate.middleware");
const { flightModel } = require("../Models/FlightTicket.Model");
const cartRoute = Router();

// cartRoute.use(authenticate)
cartRoute.get("/", authenticate, async (req, res) => {
  const { user } = req.body;

  try {
    await flightModel.find({ user })
      .populate("productId")
      .then((r) => {
        return res.status(200).send(r);
      });
  } catch (e) {
    return res.status(400).send(e.message);
  }
});

cartRoute.post("/add", authenticate, async (req, res) => {
  const productId = req.body;
  let { user } = req.body;

  try {
    let cartItem = new flightModel({ user });

    await flightModel.insertMany(req.body);
    return res.status(200).send(cartItem);
  } catch (e) {
    return res.status(400).send(e.message);
  }
});

cartRoute.patch("/update/:id", authenticate, async (req, res) => {
  const _id = req.params.id;
  const payload = req.body;
  try {
    await flightModel.findOneAndUpdate({ _id }, payload);
    res.send({ msg: `Product with id:${_id} has been updated` });
  } catch (e) {
    return res.status(400).send(e.message);
  }
});

cartRoute.delete("/delete/:id", authenticate, async (req, res) => {
  const _id = req.params.id;

  try {
    await flightModel.findOneAndDelete({ _id });
    res.send({ msg: `Product with id:${_id} has been deleted` });
  } catch (e) {
    return res.status(400).send(e.message);
  }
});

module.exports = { cartRoute };
