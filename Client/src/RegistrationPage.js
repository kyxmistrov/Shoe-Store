import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './RegistrationPage.css';
import SignUpForm from './registration components/SignUpForm';
import SignInForm from './registration components/SignInForm';
import { IoArrowBackCircleOutline, IoArrowBackCircle } from "react-icons/io5";

function RegistrationPage() {
    const [type, setType] = useState("signIn");
    const [isHovered, setIsHovered] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false); // Состояние для отслеживания успешной регистрации
    const [showSuccessMessage, setShowSuccessMessage] = useState(false); // Состояние для отображения сообщения

    const handleOnClick = text => {
        if (text !== type) {
            setType(text);
            return;
        }
    };

    const handleSuccessRegistration = () => {
        setIsRegistrationSuccess(true);
        setType("signIn");
        setShowSuccessMessage(true);
        setTimeout(() => {
            setShowSuccessMessage(false);
        }, 3000);
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const containerClass = `container ${type === "signUp" ? "right-panel-active" : ""} ${isLoaded ? "loaded" : ""}`;

    return (
        <div className="registration-page" style={{ opacity: isLoaded ? 1 : 0 }}>
            <div className="back-link-container">
                <Link to="/" className="back-link" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    {isHovered ? (
                        <IoArrowBackCircle size={30} className="back-icon" />
                    ) : (
                        <IoArrowBackCircleOutline size={30} className="back-icon" />
                    )}
                    Назад
                </Link>
            </div>
            <div className={containerClass} id="container">
                <SignUpForm onSuccessRegistration={handleSuccessRegistration}/>
                <SignInForm />
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Добро пожаловать!</h1>
                            <p>Чтобы поддерживать с нами связь, пожалуйста, войдите в систему, указав необходимые данные</p>
                            <button className="ghost" id="signIn" onClick={() => handleOnClick("signIn")}>Войти</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Привет, друг!</h1>
                            <h3>Ещё не зарегистрирован?</h3>
                            <p>Заполните необходимые данные и начните путешествие с нами в мир обуви!</p>
                            <button className="ghost" id="signUp" onClick={() => handleOnClick("signUp")}>Зарегистрироваться</button>
                        </div>
                    </div>
                </div>
            </div>
            {showSuccessMessage && (
                <div className={`success-message ${showSuccessMessage ? '' : 'hide'}`}>
                    Регистрация прошла успешно!
                </div>
            )}
            {!showSuccessMessage && (
                <div className={`success-message hide`}>
                    Регистрация прошла успешно!
                </div>
            )}


        </div>
    );
}

export default RegistrationPage;
