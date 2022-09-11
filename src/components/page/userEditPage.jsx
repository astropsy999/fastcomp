import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import { validator } from "../../utils/validator";
import BackHistoryButton from "../common/backButton";
import { useSelector, useDispatch } from "react-redux";
import { getQualities, getQualitiesLoadingStatus } from "../../store/qualities";
import {
    getProfessions,
    getProfessionsLoadingStatus
} from "../../store/professions";
import { getCurrentUserData, updateUser } from "../../store/users";

const UserEditForm = () => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState();
    const currentUser = useSelector(getCurrentUserData());
    const dispatch = useDispatch();
    const professions = useSelector(getProfessions());
    const professionLoading = useSelector(getProfessionsLoadingStatus());
    const [errors, setErrors] = useState({});
    const qualities = useSelector(getQualities());
    const qualitiesLoading = useSelector(getQualitiesLoadingStatus());

    const professionsList = professions.map((p) => ({
        label: p.name,
        value: p._id
    }));

    const qualitiesList = qualities.map((p) => ({
        label: p.name,
        value: p._id
    }));

    function getQualitiesListByIds(qualitiesIds) {
        const qualitiesArray = [];
        for (const qualId of qualitiesIds) {
            for (const quality of qualities) {
                if (quality._id === qualId) {
                    qualitiesArray.push(quality);
                    break;
                }
            }
        }
        return qualitiesArray;
    }

    const transformData = (data) => {
        if (data) {
            return getQualitiesListByIds(data).map((qual) => ({
                label: qual.name,
                value: qual._id
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        dispatch(
            updateUser({
                ...data,
                qualities: data.qualities.map((q) => q.value)
            })
        );
    };

    useEffect(() => {
        if (!professionLoading && !qualitiesLoading && currentUser && !data) {
            setData({
                ...currentUser,
                qualities: transformData(currentUser.qualities)
            });
        }
    }, [professionLoading, qualitiesLoading, currentUser, data]);

    useEffect(() => {
        if (data && isLoading) {
            setLoading(false);
        }
    }, [data]);

    const validatorConfig = {
        email: {
            isRequired: { message: "Електрона скринька обов'язкова" },
            isEmail: { message: "Невірна поштова адреса" }
        },

        name: {
            isRequired: { message: "Заповніть ім'я" }
        }
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length;

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    return (
        <div className="container mt-5">
            <BackHistoryButton />
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    <h3 className="mb-4">Редагування користувача</h3>
                    {!isLoading && Object.keys(professions).length > 0 ? (
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Ім'я"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                error={errors.name}
                            />
                            <TextField
                                label="Пошта"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                error={errors.email}
                            />
                            <SelectField
                                label="Оберіть професію"
                                options={professionsList}
                                value={data.profession}
                                onChange={handleChange}
                                defaultOption="Вибрати"
                                name="profession"
                                error={errors.profession}
                            />
                            <RadioField
                                options={[
                                    { name: "Чол", value: "male" },
                                    { name: "Жін", value: "female" },
                                    { name: "Інше", value: "other" }
                                ]}
                                label="Стать"
                                value={data.sex}
                                name="sex"
                                onChange={handleChange}
                            />
                            <MultiSelectField
                                defaultValue={data.qualities}
                                options={qualitiesList}
                                onChange={handleChange}
                                name="qualities"
                                label="Ваші якості"
                            />
                            <button
                                className="btn btn-primary w-100"
                                type="submit"
                                disabled={isValid}
                            >
                                Зберегти
                            </button>
                        </form>
                    ) : (
                        <h3>Завантаження...</h3>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserEditForm;
