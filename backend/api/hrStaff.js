import dbConnect from '../dbConnect.js';
import HrStaff from '../models/HrStaff.js';

export const createHrStaff = async (req, res) => {
    await dbConnect();
    const { name, email, phone, department, jobTitle, location, joinedDate } = req.body;

    try {
        const hrStaff = new HrStaff({ name, email, phone, department, jobTitle, location, joinedDate });
        await hrStaff.save();
        res.status(201).json(hrStaff);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getHrStaff = async (req, res) => {
    await dbConnect();
    try {
        const hrStaffList = await HrStaff.find();
        res.status(200).json(hrStaffList);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getHrStaffById = async (req, res) => {
    await dbConnect();
    const { id } = req.query;

    try {
        const hrStaff = await HrStaff.findById(id);
        if (!hrStaff) return res.status(404).json({ message: 'HR Staff not found' });
        res.status(200).json(hrStaff);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateHrStaff = async (req, res) => {
    await dbConnect();
    const { id } = req.query;

    try {
        const hrStaff = await HrStaff.findByIdAndUpdate(id, req.body, { new: true });
        if (!hrStaff) return res.status(404).json({ message: 'HR Staff not found' });
        res.status(200).json(hrStaff);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteHrStaff = async (req, res) => {
    await dbConnect();
    const { id } = req.query;

    try {
        const hrStaff = await HrStaff.findByIdAndDelete(id);
        if (!hrStaff) return res.status(404).json({ message: 'HR Staff not found' });
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
