const Journal = require('../models/Journal');

// Retrieve all journals
const all = async (req, res) => {
    try {
        const journals = await Journal.find();

        if (journals.length) {
            res.status(200).json(journals);
        } else {
            res.status(404).json({
                message: 'No journals data found',
            });
        }
    } catch (error) {
        res.status(400).json({
            message: 'Failed to retrieve journal data',
            error: error.message,
        });
    }
}

// Retrieve a journal entry by ID
const jorunal = async (req, res) => {
    try {
        const { id } = req.params;
        const journal = await Journal.findById({ _id: id });

        if (journal?._id) {
            res.status(200).json(journal);
        } else {
            res.status(404).json({
                message: 'No journal data found',
            });
        }
    } catch (error) {
        res.status(400).json({
            message: 'Failed to retrieve journal data',
            error: error.message,
        });
    }
}

// Retrieve journals for a specific year
const byYear = async (req, res) => {
    try {
        const { year } = req.params;
        const journals = await Journal.find({ year });

        if (journals.length) {
            res.status(200).json(journals);
        } else {
            res.status(404).json({
                message: 'No journals found for the specified year',
            });
        }
    } catch (error) {
        res.status(400).json({
            message: 'Error fetching journals by year',
            error: error.message,
        });
    }
}

// Retrieve the last three journals
const lastThree = async (req, res) => {
    try {
        const lastThreeJournals = (await Journal.find().sort({ _id: -1 }).limit(3)).reverse();

        if (lastThreeJournals.length) {
            res.status(200).json(lastThreeJournals);
        } else {
            res.status(404).json({
                message: 'No journals data found',
            });
        }
    } catch (error) {
        res.status(400).json({
            message: 'Failed to retrieve journal data',
            error: error.message,
        });
    }
}

// Add a new journal entry
const add = async (req, res) => {
    try {
        const { year, title, content, url, img, disabled } = req.body;

        const newJournal = new Journal({
            year, title, content, url, img, disabled,
        });

        await newJournal.save();

        res.status(201).json({
            message: 'The journal entry was successfully added to the database',
            createdJournal: newJournal,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error adding the journal entry to the database',
            error: error.message,
        })
    }
}

// Edit an existing journal entry
const edit = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const options = { new: true, runValidators: true };

        const updatedJournal = await Journal.findByIdAndUpdate(id, data, options);

        if (updatedJournal) {
            res.status(200).json({
                message: 'Journal entry updated successfully',
                updatedJournal,
            });
        } else {
            res.status(404).json({
                message: 'Journal entry not found for update',
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error updating journal entry',
            error: error.message,
        });
    }
}

// Remove a journal entry
const remove = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedJournal = await Journal.findOneAndDelete({ _id: id });

        if (deletedJournal) {
            res.status(200).json({
                message: 'Journal entry has been deleted',
                deletedJournal,
            });
        } else {
            res.status(404).json({
                message: 'Journal entry not found for deletion',
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'The release date could not be deleted',
            error: error.message,
        });
    }
}

module.exports = { all, jorunal, byYear, lastThree, add, edit, remove };
