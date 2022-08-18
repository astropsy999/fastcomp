import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import API from "../../api";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";

const RegisterForm = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        profession: "",
        sex: "male",
        qualities: [],
        licence: false
    });
    const [errors, setErrors] = useState({});
    const [professions, setProfessions] = useState();
    const [qualities, setQualities] = useState({});

    useEffect(() => {
        API.professions.fetchAll().then((data) => {
            setProfessions(data);
        });
        API.qualities.fetchAll().then((data) => {
            setQualities(data);
        });
    }, []);

    const validatorConfig = {
        email: {
            isRequired: { message: "Електрона скринька обов'язкова" },
            isEmail: { message: "Невірна поштова адреса" }
        },
        password: {
            isRequired: { message: "Пароль обов'язковий" },
            isCapitalSymbol: {
                message: "Пароль повинен мати хочаб одну велику літеру"
            },
            isDigitSymbol: { message: "Пароль повинен мати хоча б одну цифру" },
            min: {
                message: "Пароль повинен складатися мінімум з 8 символів",
                value: 8
            }
        },
        profession: {
            isRequired: { message: "Обов'язково оберіть професію" }
        },
        licence: {
            isRequired: {
                message:
                    "Ви не можете використовувати сервіс без підтвердження ліцензійної угоди"
            }
        }
    };

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        console.log(data);
    };

    useEffect(() => {
        validate();
    }, [data]);

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Email"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />
            <TextField
                label="Пароль"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            />

            <SelectField
                label="Оберіть професію"
                options={professions}
                value={data.profession}
                onChange={handleChange}
                defaultOption="Вибрати"
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
                options={qualities}
                onChange={handleChange}
                name="qualities"
                label="Ваші якості"
            />
            <CheckBoxField
                value={data.licence}
                onChange={handleChange}
                name="licence"
                error={errors.licence}
            >
                Підтвердити <a>ліцензійну угоду</a>
            </CheckBoxField>

            <button
                className="btn btn-primary w-100"
                type="submit"
                disabled={!isValid}
            >
                Увійти
            </button>
        </form>
    );
};

export default RegisterForm;
