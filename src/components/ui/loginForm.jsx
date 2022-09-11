import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import CheckBoxField from "../common/form/checkBoxField";
import TextField from "../common/form/textField";
import { useDispatch, useSelector } from "react-redux";
import { getAuthError, signIn } from "../../store/users";
import { useHistory } from "react-router-dom";

const LoginForm = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        stayOn: false
    });
    const loginError = useSelector(getAuthError());
    const [errors, setErrors] = useState({});
    const history = useHistory();

    const dispatch = useDispatch();

    const validatorConfig = {
        email: {
            isRequired: { message: "Електрона скринька обов'язкова" }
        },
        password: {
            isRequired: { message: "Пароль обов'язковий" }
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
        const redirect = history.location.state
            ? history.location.state.from.pathname
            : "/";
        dispatch(signIn({ payload: data, redirect }));
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
            {loginError && <p className="text-danger">{loginError}</p>}
            <button
                className="btn btn-primary w-100"
                type="submit"
                disabled={!isValid || loginError}
            >
                Увійти
            </button>
        </form>
    );
};

export default LoginForm;
