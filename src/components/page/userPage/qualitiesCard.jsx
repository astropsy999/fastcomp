import React from "react";
import PropTypes from "prop-types";
import QualitiesList from "../../ui/qualities/qualitiesList";

const QualitiesCard = ({ qualities }) => {
    return (
        <div className="card mb-3">
            <div className="card-body d-flex flex-column justify-content-center text-center">
                <h5 className="card-title">
                    <span>Якості</span>
                </h5>
                <p className="card-text">
                    <QualitiesList qualities={qualities} />
                </p>
            </div>
        </div>
    );
};
QualitiesCard.propTypes = {
    qualities: PropTypes.array
};

export default QualitiesCard;
