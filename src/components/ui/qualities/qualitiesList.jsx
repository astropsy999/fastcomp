import React, { useEffect } from "react";
import Qualitie from "./qualitie";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import {
    getQualitiesByIds,
    getQualitiesLoadingStatus,
    loadQualitiesList
} from "../../../store/qualities";

const QualitiesList = ({ qualities }) => {
    const dispatch = useDispatch();
    const isLoading = useSelector(getQualitiesLoadingStatus());
    if (isLoading) return "Завантаження...";
    const qualitiesList = useSelector(getQualitiesByIds(qualities));

    useEffect(() => {
        dispatch(loadQualitiesList());
    }, []);

    return (
        <>
            {qualitiesList.map((q) => (
                <Qualitie {...q} key={q._id} />
            ))}
        </>
    );
};

QualitiesList.propTypes = {
    qualities: PropTypes.array
};

export default QualitiesList;
