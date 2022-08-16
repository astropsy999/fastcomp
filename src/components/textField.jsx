import React from "react";
import PropTypes from "prop-types";

const TextField = ({ label, type, name, value, onChange, error }) => {
    return (
        <div>
            <label htmlFor={label}>{label}</label>
            <input
                type={type}
                id={name}
                onChange={onChange}
                value={value}
                name={name}
            />
            {error && <p>{error}</p>}
        </div>
    );
};
TextField.defaultProps = {
    type: "text"
};
TextField.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string
};

export default TextField;
