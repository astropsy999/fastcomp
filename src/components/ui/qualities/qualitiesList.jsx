import React from "react";
import Qualitie from "./qualitie";
import PropTypes from "prop-types";
import { useQualities } from "../../../hooks/useQualities";

const QualitiesList = ({ qualities }) => {
    const { isLoading } = useQualities();
    if (isLoading) return "Завантаження...";
    return (
        <>{qualities && qualities.map((q) => <Qualitie id={q} key={q} />)}</>
    );
};

QualitiesList.propTypes = {
    qualities: PropTypes.array
};

export default QualitiesList;
