import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const SkillsAndMajorsContext = createContext();

export const useSkillsAndMajors = () => {
    return useContext(SkillsAndMajorsContext);
};

export const SkillsAndMajorsProvider = ({ children }) => {
    const [hardSkillsOptions, setHardSkillsOptions] = useState([]);
    const [softSkillsOptions, setSoftSkillsOptions] = useState([]);
    const [majorOptions, setMajorOptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSkillsAndMajors = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/skills-and-majors');
                setHardSkillsOptions(response.data.hardSkills);
                setSoftSkillsOptions(response.data.softSkills);
                setMajorOptions(response.data.majors);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch skills and majors');
            } finally {
                setLoading(false);
            }
        };

        fetchSkillsAndMajors();
    }, []);

    return (
        <SkillsAndMajorsContext.Provider value={{ hardSkillsOptions, softSkillsOptions, majorOptions, loading, error }}>
            {children}
        </SkillsAndMajorsContext.Provider>
    );
};
