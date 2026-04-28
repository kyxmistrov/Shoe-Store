import React, { useState, useEffect } from "react";

function SignUpForm({ onSuccessRegistration }) {
    const [state, setState] = useState({
        name: "",
        email: "",
        password: "",
        errorMessage: "",
        showError: false
    });

    const handleChange = evt => {
        const { name, value } = evt.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleOnSubmit = evt => {
        evt.preventDefault();

        const { name, email, password } = state;

        fetch('http://localhost:8080/api/users/registration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                login: name,
                email: email,
                password: password
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                if (data.error) {
                    setState({
                        ...state,
                        errorMessage: "Этот email уже используется!",
                        showError: true
                    });
                } else {
                    onSuccessRegistration();
                    setState({
                        name: "",
                        email: "",
                        password: "",
                        errorMessage: "",
                        showError: false
                    });
                }
            })




    };

    useEffect(() => {
        if (state.showError) {
            const timer = setTimeout(() => {
                setState(prevState => ({
                    ...prevState,
                    showError: false
                }));
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [state.showError]);

    return (
        <div className="form-container sign-up-container">
            <form onSubmit={handleOnSubmit}>
                <h1>Регистрация</h1>
                <span>Используйте адрес электронной почты</span>
                <input
                    type="text"
                    name="name"
                    value={state.name}
                    onChange={handleChange}
                    placeholder="Имя"
                    required
                />
                <input
                    type="email"
                    name="email"
                    value={state.email}
                    onChange={handleChange}
                    placeholder="Эл. почта"
                    required
                />
                <input
                    type="password"
                    name="password"
                    value={state.password}
                    onChange={handleChange}
                    placeholder="Пароль"
                    required
                />
                <button type="submit" className="in">Зарегистрироваться</button>
                <p className={`error-message ${state.showError ? 'show' : 'hide'}`}>{state.errorMessage}</p>
            </form>
        </div>
    );
}

export default SignUpForm;
