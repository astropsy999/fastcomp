import React from "react";
import PropTypes from "prop-types";

const Grouplist = ({
    items,
    valueProperty,
    contentProperty,
    onItemSelect,
    selectedItem
}) => {
    if (!Array.isArray(items)) {
        return (
            <ul className="list-group">
                {Object.keys(items).map((item) => (
                    <li
                        className={
                            "list-group-item" +
                            (items[item] === selectedItem ? " active" : "")
                        }
                        key={items[item][valueProperty]}
                        onClick={() => onItemSelect(items[item])}
                        role="button"
                    >
                        {items[item][contentProperty]}
                    </li>
                ))}
            </ul>
        );
    } else {
        return (
            <ul className="list-group">
                {items.map((item) => (
                    <li
                        className={
                            "list-group-item" +
                            (item === selectedItem ? " active" : "")
                        }
                        key={item[valueProperty]}
                        onClick={() => onItemSelect(item)}
                        role="button"
                    >
                        {item[contentProperty]}
                    </li>
                ))}
            </ul>
        );
    }
};
Grouplist.defaultProps = {
    valueProperty: "_id",
    contentProperty: "name"
};
Grouplist.propTypes = {
    items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    valueProperty: PropTypes.string.isRequired,
    contentProperty: PropTypes.string.isRequired,
    onItemSelect: PropTypes.func.isRequired,
    selectedItem: PropTypes.object
};

export default Grouplist;
