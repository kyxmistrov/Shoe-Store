import React, { useState, useEffect } from "react";

function SignInForm() {
    const [state, setState] = useState({
        email: "",
        password: "",
        errorMessage: "",
        showError: false
    });

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setState((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleOnSubmit = (evt) => {
        evt.preventDefault();

        const { email, password } = state;
        fetch("http://localhost:8080/api/users/find", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({
                email: email,
                password: password
            })
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then((data) => {
                if (data && data.username) {
                    window.location.href = `/?username=${data.username}`;
                } else {
                    setState((prevState) => ({
                        ...prevState,
                        errorMessage: "Неправильная почта или пароль",
                        showError: true
                    }));
                }
            })
            .catch((error) => {
                console.error("There was a problem with your fetch operation:", error);
            });
    };

    useEffect(() => {
        if (state.showError) {

            const timer = setTimeout(() => {
                setState((prevState) => ({
                    ...prevState,
                    showError: false
                }));
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [state.showError]);

    return (
        <div className="form-container sign-in-container">
            <form onSubmit={handleOnSubmit}>
                <h1>Вход</h1>
                <span>Введите данные своей учетной записи</span>
                <input
                    type="email"
                    placeholder="Эл. почта"
                    name="email"
                    value={state.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Пароль"
                    value={state.password}
                    onChange={handleChange}
                    required
                />
                <button className="in">Войти</button>
                <p className={`error-message ${state.showError ? 'show' : 'hide'}`}>{state.errorMessage}</p>
            </form>
        </div>
    );
}

export default SignInForm;
