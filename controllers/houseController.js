import { houses } from '../data/houses.js';

export const getAllHouses = (req, res) => {
  let result = houses;
  
  // Bonus 2: Search & Filter
  if(req.query.location) {
    result = result.filter(h => h.location.toLowerCase().includes(req.query.location.toLowerCase()));
  }
  res.status(200).json({ success: true, data: result });
};

export const getHouseById = (req, res) => {
  const house = houses.find(h => h.id === parseInt(req.params.id));
  if(!house) return res.status(404).json({ success: false, message: "House not found" });
  res.status(200).json({ success: true, data: house });
};

export const createHouse = (req, res) => {
  const { title, price, location } = req.body;
  // Bonus 1: Validation
  if(!title || !price || !location) {
    return res.status(400).json({ success: false, message: "Please provide title, price, location" });
  }
  const newHouse = { id: houses.length + 1, ...req.body };
  houses.push(newHouse);
  res.status(201).json({ success: true, data: newHouse });
};

export const updateHouse = (req, res) => {
  const house = houses.find(h => h.id === parseInt(req.params.id));
  if(!house) return res.status(404).json({ success: false, message: "House not found" });
  Object.assign(house, req.body);
  res.status(200).json({ success: true, data: house });
};

export const deleteHouse = (req, res) => {
  const index = houses.findIndex(h => h.id === parseInt(req.params.id));
  if(index === -1) return res.status(404).json({ success: false, message: "House not found" });
  houses.splice(index, 1);
  res.status(200).json({ success: true, message: "House deleted" });
};