const Year = require('../models/Year');

// Retrieve all available years
const all = async (req, res) => {
    try {
        const years = await Year.find();

        if (years.length) {
            res.status(200).json(years);
        } else {
            res.status(404).json({
                message: 'No years data found',
            });
        }
    } catch (error) {
        res.status(400).json({
            message: 'Failed to retrieve years data',
            error: error.message,
        });
    }
}

// Retrieve data for a specific year
const year = async (req, res) => {
    try {
        const { year } = req.params;
        const foundYear = await Year.find({ year });

        if (foundYear.length) {
            res.status(200).json(foundYear[0]);
        } else {
            res.status(404).json({
                message: 'Year data not found',
            });
        }
    } catch (error) {
        res.status(400).json({
            message: 'Failed to retrieve year data',
            error: error.message,
        });
    }
};

// Add a new year to the database
const add = async (req, res) => {
    try {
        const { year } = req.params;
        const newYear = new Year({ year });
        await newYear.save();

        res.status(201).json({
            message: 'The year was successfully added to the database',
            addedYear: newYear,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error adding the year to the database',
            error: error.message,
        })
    }
}

// Edit data for a specific year
const edit = async (req, res) => {
    try {
        const { year } = req.params;
        const data = req.body;
        const options = { new: true, runValidators: true };

        const updatedYear = await Year.findOneAndUpdate(
            { year }, 
            { $set: data }, 
            options
        );

        if (updatedYear) {
            res.status(200).json({
                message: 'Year data updated successfully',
                updatedYear,
            });
        } else {
            res.status(404).json({
                message: 'Year data not found for update',
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error updating year data',
            error: error.message,
        });
    }
};

// Remove data for a specific year
const remove = async (req, res) => {
    try {
        const { year } = req.params;
        const deletedYear = await Year.findOneAndDelete({ year });

        if (deletedYear) {
            res.status(200).json({
                message: 'Year data has been deleted',
                deletedYear,
            });
        } else {
            res.status(404).json({
                message: 'Year data not found for deletion',
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting year data',
            error: error.message,
        });
    }
};

module.exports = { all, year, add, edit, remove };
