import React from "react";
import PropTypes from "prop-types";

const Qualitie = ({ q }) => {
    const badgeClasses = "badge m-1 border-0 bg-";
    return (
        <span key={q._id}>
            <button className={badgeClasses + q.color}>{q.name}</button>
        </span>
    );
};

Qualitie.propTypes = {
    q: PropTypes.object.isRequired
};

export default Qualitie;
