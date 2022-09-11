import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";
import { useSelector, useDispatch } from "react-redux";
import { getQualities } from "../../store/qualities";
import { getProfessions } from "../../store/professions";
import { signUp } from "../../store/users";

const RegisterForm = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState({
        email: "",
        password: "",
        profession: "",
        sex: "male",
        name: "",
        qualities: [],
        licence: false
    });
    const [errors, setErrors] = useState({});

    const qualities = useSelector(getQualities());

    const qualitiesList = qualities.map((q) => ({
        label: q.name,
        value: q._id
    }));

    const professions = useSelector(getProfessions());
    const professionsList = professions.map((p) => ({
        label: p.name,
        value: p._id
    }));

    const validatorConfig = {
        email: {
            isRequired: { message: "Електрона скринька обов'язкова" },
            isEmail: { message: "Невірна поштова адреса" }
        },
        name: {
            isRequired: { message: "Ім'я обов'язкове" },
            min: {
                message: "Ім'я повинне складатися мінімум з 3 символів",
                value: 3
            }
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
        const newData = {
            ...data,
            qualities: data.qualities.map((q) => q.value)
        };
        dispatch(signUp(newData));
    };

    useEffect(() => {
        validate();
    }, [data]);

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Ім'я"
                name="name"
                value={data.name}
                onChange={handleChange}
                error={errors.name}
            />
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
                options={professionsList}
                value={data.profession}
                onChange={handleChange}
                defaultOption="Вибрати"
                error={errors.profession}
                name="profession"
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
                options={qualitiesList}
                onChange={handleChange}
                defaultValue={data.qualities}
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
                Реєстрація
            </button>
        </form>
    );
};

export default RegisterForm;
