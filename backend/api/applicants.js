import dbConnect from '../dbConnect.js'; // Import your database connection logic
import Applicant from '../models/Applicant.js'; // Your Applicant model

// Create a new applicant
export const createApplicant = async (event) => {
    await dbConnect();
    const body = JSON.parse(event.body);
    try {
        const applicant = await Applicant.create(body);
        return {
            statusCode: 201,
            body: JSON.stringify(applicant),
        };
    } catch (error) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: error.message }),
        };
    }
};

// Get all applicants
export const getApplicants = async () => {
    await dbConnect();
    try {
        const applicants = await Applicant.find();
        return {
            statusCode: 200,
            body: JSON.stringify(applicants),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};

// Get an applicant by ID
export const getApplicantById = async (event) => {
    await dbConnect();
    const { id } = event.pathParameters;
    try {
        const applicant = await Applicant.findById(id);
        if (!applicant) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Applicant not found' }),
            };
        }
        return {
            statusCode: 200,
            body: JSON.stringify(applicant),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};

// Update an applicant
export const updateApplicant = async (event) => {
    await dbConnect();
    const { id } = event.pathParameters;
    const body = JSON.parse(event.body);

    try {
        const updatedApplicant = await Applicant.findByIdAndUpdate(id, body, { new: true });
        if (!updatedApplicant) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Applicant not found' }),
            };
        }
        return {
            statusCode: 200,
            body: JSON.stringify(updatedApplicant),
        };
    } catch (error) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: error.message }),
        };
    }
};

// Delete an applicant
export const deleteApplicant = async (event) => {
    await dbConnect();
    const { id } = event.pathParameters;
    try {
        const deletedApplicant = await Applicant.findByIdAndDelete(id);
        if (!deletedApplicant) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Applicant not found' }),
            };
        }
        return {
            statusCode: 204,
            body: null,
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};
