import React, { useEffect, useState } from "react";
// import { validator } from "../../utils/validator";
import CheckBoxField from "../common/form/checkBoxField";
import TextField from "../common/form/textField";
import * as yup from "yup";

const LoginForm = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        stayOn: false
    });
    const [errors, setErrors] = useState({});

    // const validatorConfig = {
    //     email: {
    //         isRequired: { message: "Електрона скринька обов'язкова" },
    //         isEmail: { message: "Некоректна поштова адреса" }
    //     },
    //     password: {
    //         isRequired: { message: "Пароль обов'язковий" },
    //         isCapitalSymbol: {
    //             message: "Пароль повинен мати хочаб одну велику літеру"
    //         },
    //         isDigitSymbol: { message: "Пароль повинен мати хоча б одну цифру" },
    //         min: {
    //             message: "Пароль повинен складатися мінімум з 8 символів",
    //             value: 8
    //         }
    //     }
    // };

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validateScheme = yup.object().shape({
        password: yup
            .string()
            .required("Пароль обов'язковий")
            .matches(
                /^(?=.*[A-Z])/,
                "Пароль повинен мати хочаб одну велику літеру"
            )
            .matches(/(?=.*[0-9])/, "Пароль повинен мати хоча б одну цифру")
            .matches(
                /(?=.*[!@#$%^&*])/,
                "Пароль повинен містити хочаб один спеціальний символ !@#$%^&*"
            )
            .matches(
                /(?=.{8,})/,
                "Пароль повинен складатися мінімум з 8 символів"
            ),
        email: yup
            .string()
            .required("Електрона скринька обов'язкова")
            .email("Некоректна поштова адреса")
    });

    const validate = () => {
        // const errors = validator(data, validatorConfig);
        validateScheme
            .validate(data)
            .then(() => setErrors({}))
            .catch((err) => setErrors({ [err.path]: err.message }));
        // setErrors(errors);
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
            <CheckBoxField
                value={data.stayOn}
                onChange={handleChange}
                name="stayOn"
            >
                Залишатись в системі
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

export default LoginForm;
