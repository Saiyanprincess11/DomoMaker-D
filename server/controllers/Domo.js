const models = require('../models');

const { Domo } = models;

// Creates Domo
const makeDomo = async (req, res) => {
  // Makes sure useer enters all fields
  if (!req.body.name || !req.body.age || !req.body.skill) {
    return res.status(400).json({ error: 'A skill, name, and age are required! ' });
  }

  const domoData = {
    name: req.body.name,
    age: req.body.age,
    skill: req.body.skill, 
    owner: req.session.account._id,
  };

  try {
    const newDomo = new Domo(domoData);
    newDomo.save();
    return res.status(201).json({name: newDomo.name, age: newDomo.age, skill: newDomo.skill}); 
  } catch (err) {
    // console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Domo already exists!' });
    }
    return res.status(500).json({ error: 'An error occured making domo!' });
  }
};

// Renders main page
const makerPage = async (req, res) => {
    return res.render('app');
};

const aboutPage = (req, res) => {
  res.render('about'); 
}; 

const contactPage = (req, res) => {
  res.render('contact'); 
}


//Retrieves all user domos
const getDomos = async (req, res) => {
  try{ 
    const query = {owner: req.session.account._id}; 
    const docs = await Domo.find(query).select('name age skill').lean().exec(); 

    return res.json({domos: docs}); 
  }catch(err){
    console.log(err); 
    return res.status(500).json({error: 'Error retrieving domos!'}); 
  }
}; 

module.exports = {
  makerPage,
  aboutPage, 
  contactPage,
  makeDomo,
  getDomos, 
};
