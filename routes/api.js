const express = require('express');
const router = express.Router();
const axios = require('axios');
const querystring = require('querystring');


router.post('/match', async function(req, res, next) {
  let token = process.env.YELP_API_KEY;
  let {address1, name, city, state} = req.body;
  let query = querystring.stringify({ name, address1, city, state, country: 'CA'} );
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  try {
    let id = (await axios.get(`https://api.yelp.com/v3/businesses/matches?${query}`, config)).data.businesses[0].id;
    let business = (await axios.get(`https://api.yelp.com/v3/businesses/${id}`, config)).data;
    res.send(business);
  } catch (e){
    next(e);
  }

});

module.exports = router;
