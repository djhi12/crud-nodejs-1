const express = require('express');
const router = express.Router();
const Item = require('../models/item'); // Import your item model

// Define a route to get all items
router.get('/items', async (req, res) => {
    try {
        const items = await Item.find(); // Fetch all items from MongoDB
        res.json(items);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Define a route to create a new item
router.post('/items', async (req, res) => {
    try {
        // Validate the request body here (e.g., check if required fields are present)
        const newItem = new Item(req.body); // Create a new item based on the request body
        await newItem.save(); // Save it to the database
        res.status(201).json(newItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Define a route to update an item by ID
router.put('/items/:id', async (req, res) => {
    try {
        // Validate the request body here (e.g., check if required fields are present)
        const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedItem) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.json(updatedItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Define a route to delete an item by ID
router.delete('/items/:id', async (req, res) => {
    try {
        const deletedItem = await Item.findByIdAndDelete(req.params.id);
        if (!deletedItem) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.json({ message: 'Item deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// 
module.exports = router;
