import React from "react";
import PropTypes from "prop-types";
import { useQualities } from "../../../hooks/useQualities";

const Qualitie = ({ id }) => {
    const { isLoading, getQuality } = useQualities();
    const quality = getQuality(id);
    console.log("quality: ", quality);

    const badgeClasses = "badge m-1 border-0 bg-";

    if (!isLoading) {
        return (
            <span key={id}>
                <button className={badgeClasses + quality.color}>
                    {quality.name}
                </button>
            </span>
        );
    } else {
        return "Завантаження...";
    }
};

Qualitie.propTypes = {
    id: PropTypes.string
};

export default Qualitie;
