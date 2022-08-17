import React, { useEffect, useState } from "react";
import TextField from "../components/textField";
import { validator } from "../utils/validator";

const Login = () => {
    const [data, setData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});

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
        }
    };

    const handleChange = ({ target }) => {
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
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    <h3 className="mb-4">Вхід</h3>
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
                        <button
                            className="btn btn-primary w-100"
                            type="submit"
                            disabled={!isValid}
                        >
                            Увійти
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
