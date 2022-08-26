import React, { useContext, useEffect, useState } from "react";
import qualityService from "../services/quality.service";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

const QualityContext = React.createContext();

export const useQualities = () => {
    return useContext(QualityContext);
};

export const QualityProvider = ({ children }) => {
    const [qualities, setQualities] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getQualitiesList();
    }, []);

    async function getQualitiesList() {
        try {
            const { content } = await qualityService.get();
            setQualities(content);
            setLoading(false);
        } catch (error) {
            errorCatcher(error);
        }
    }

    function getQuality(id) {
        return qualities.find((q) => q._id === id);
    }

    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
        setLoading(false);
    }

    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);

    return (
        <QualityContext.Provider value={{ isLoading, qualities, getQuality }}>
            {children}
        </QualityContext.Provider>
    );
};

QualityProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
