import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import TextField from "../common/form/textField";
import API from "../../api";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import { validator } from "../../utils/validator";

const UserEditForm = () => {
    const params = useParams();
    const { userId } = params;
    const history = useHistory();

    const [isLoading, setIsLoading] = useState(false);
    const [professions, setProfessions] = useState();
    const [qualities, setQualities] = useState([]);
    const [data, setData] = useState({
        name: "",
        email: "",
        profession: "",
        sex: "male",
        qualities: []
    });
    const [errors, setErrors] = useState({});

    const transformData = (data) => {
        return data.map((qual) => ({ label: qual.name, value: qual._id }));
    };

    useEffect(() => {
        setIsLoading(true);
        API.users.getById(userId).then(({ profession, qualities, ...data }) => {
            setData((prevState) => ({
                ...prevState,
                ...data,
                qualities: transformData(qualities),
                profession: profession._id
            }));
        });
        API.professions.fetchAll().then((data) => {
            setProfessions(data);
        });
        API.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((optionName) => ({
                value: data[optionName]._id,
                label: data[optionName].name,
                color: data[optionName].color
            }));
            setQualities(qualitiesList);
        });
    }, []);

    useEffect(() => {
        if (data._id) setIsLoading(false);
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

    const getProfessionById = (id) => {
        for (const prof in professions) {
            const profData = professions[prof];
            if (profData._id === id) return profData;
        }
    };

    const getQualities = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            for (const quality in qualities) {
                if (elem.value === qualities[quality].value) {
                    qualitiesArray.push({
                        _id: qualities[quality].value,
                        name: qualities[quality].label,
                        color: qualities[quality].color
                    });
                }
            }
        }
        return qualitiesArray;
    };

    const isValid = Object.keys(errors).length;

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const { profession, qualities } = data;
        API.users
            .update(userId, {
                ...data,
                profession: getProfessionById(profession),
                qualities: getQualities(qualities)
            })
            .then((data) => history.push(`/users/${data._id}`));
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    <h3 className="mb-4">Редагування користувача</h3>
                    {!isLoading ? (
                        <>
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
                                    options={professions}
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
                                    options={qualities}
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
                        </>
                    ) : (
                        <h3>Завантаження...</h3>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserEditForm;
