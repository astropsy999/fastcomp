import React from "react";
import PropTypes from "prop-types";

const SearchStatus = ({ length }) => {
    const createLegend = (usnum) => {
        switch (usnum) {
            case 4:
                return "людини зустрінуться";
            case 3:
                return "людини зустрінуться";
            case 2:
                return "людини зустрінуться";
            case 1:
                return "людина зустрінеться";
            default:
                return "людей зустрінуться";
        }
    };
    return (
        <h2 className={"badge m-2 bg-" + (length > 0 ? "primary" : "danger")}>
            {length > 0
                ? `${length} ${createLegend(length)} з тобою сьогодні`
                : "нікого немає для зустрічі"}
        </h2>
    );
};

SearchStatus.propTypes = {
    length: PropTypes.number.isRequired
};

export default SearchStatus;
