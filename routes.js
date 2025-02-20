const express = require('express');
const router = express.Router();

const items = [];

const createItem = (req, res) => {
    const newItem = { id: Date.now(), ...req.body };
    items.push(newItem);
    res.status(201).json(newItem);
};

const getItems = (req, res) => {
    res.json(items);
};

const getItemById = (req, res) => {
    const id_ = req.params.id;
    const isItem = items.find(i => i.id == id_);
    isItem ? res.json(isItem) : res.status(404).json({ message: "Item not found" });
};

const updateItem = (req, res) => {
    const index = items.findIndex(i => i.id == req.params.id);
    if (index !== -1) {
        items[index] = { ...items[index], ...req.body };
        res.json(items[index]);
    } else {
        res.status(404).json({ message: "Item not found!" });
    }
};

const deleteItem = (req, res) => {
    const index = items.findIndex(i => i.id == req.params.id);
    if (index !== -1) {
        items.splice(index, 1);
        res.json({ message: "Item deleted" });
    } else {
        res.status(404).json({ message: "Item not found" });
    }
};

router.post('/items', createItem); // Create
router.get('/items', getItems); // Read all
router.get('/items/:id', getItemById); // Read one
router.put('/items/:id', updateItem); // Update
router.delete('/items/:id', deleteItem); // Delete

module.exports = router;
