import React, { useState, useEffect } from 'react';
import {Link, useLocation} from 'react-router-dom';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import './CheckoutPage.css';
import {IoArrowBackCircle, IoArrowBackCircleOutline} from "react-icons/io5";

const CheckoutPage = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const [isHovered, setIsHovered] = useState(false);
    const [summa, setSumma] = useState(() => sessionStorage.getItem('summa') || '');
    const [username, setUsername] = useState(() => sessionStorage.getItem('username') || '');
    const [deliveryCity, setDeliveryCity] = useState('');
    const [street, setStreet] = useState('');
    const [house, setHouse] = useState('');
    const [additionalInfo, setAdditionalInfo] = useState('');
    const [locationError, setLocationError] = useState(false);
    const [mapState, setMapState] = useState({ center: [55.751574, 37.573856], zoom: 9 });
    const [placemarkGeometry, setPlacemarkGeometry] = useState(null);
    const [ymaps, setYmaps] = useState(null);

    useEffect(() => {
        const summaParam = searchParams.get('summa');
        const usernameParam = searchParams.get('username');

        if (summaParam) {
            setSumma(summaParam);
            sessionStorage.setItem('summa', summaParam);
        }
        if (usernameParam) {
            setUsername(usernameParam);
            sessionStorage.setItem('username', usernameParam);
        }

        window.history.replaceState({}, document.title, '/checkout');

        // Загрузка API Yandex Maps
        if (!window.ymaps) {
            const script = document.createElement('script');
            script.src = `https://api-maps.yandex.ru/2.1/?apikey=77eaac79-6bbf-4d9b-b8c7-50c49cf206a9&lang=ru_RU`;
            script.async = true;
            script.onload = () => {
                setYmaps(window.ymaps);
            };
            document.body.appendChild(script);

            return () => {
                document.body.removeChild(script);
            };
        } else {
            setYmaps(window.ymaps);
        }
    }, [searchParams]);

    const handleDeliverySubmit = async (e) => {
        e.preventDefault();

        if (deliveryCity.trim() !== '' && street.trim() !== '' && house.trim() !== '' && ymaps) {
            try {
                const address = `${deliveryCity}, ${street}, ${house}`;
                const geocode = await ymaps.geocode(address);
                const coordinates = geocode.geoObjects.get(0).geometry.getCoordinates();

                setMapState({ center: coordinates, zoom: 15 });
                setPlacemarkGeometry(coordinates);
                setLocationError(false);
            } catch (error) {
                console.error('Ошибка геокодирования адреса:', error);
                setLocationError(true);
            }
        } else {
            setLocationError(true);
        }
    };
    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };
    const isUsernameMatch = sessionStorage.getItem('username') === localStorage.getItem('username');

    return (
        <div className="checkout-container">
            <div className="back-link-container">
                <Link to="/" className="back-link" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    {isHovered ? (
                        <IoArrowBackCircle size={25} className="back-icon"/>
                    ) : (
                        <IoArrowBackCircleOutline size={25} className="back-icon"/>
                    )}
                    Назад
                </Link>
            </div>
            <div className="order-form">
                {isUsernameMatch && username && (
                    <div>
                        <h2 style={{textAlign: 'center', marginBottom: '20px'}}>Оформление заказа</h2>
                        <p style={{marginBottom: '10px'}}><b>Способ получения: </b><u>Доставка</u></p>
                        <p style={{marginBottom: '10px'}}><b>Имя пользователя: </b><u> {username}</u></p>
                        <p style={{marginBottom: '20px'}}><b>Сумма
                            заказа: </b><u>{new Intl.NumberFormat().format(summa)}₽</u></p>

                        <form onSubmit={handleDeliverySubmit}>
                            <label htmlFor="deliveryCity">Город:</label>
                            <input
                                type="text"
                                id="deliveryCity"
                                value={deliveryCity}
                                onChange={(e) => setDeliveryCity(e.target.value)}
                            />

                            <label htmlFor="street">Улица:</label>
                            <input
                                type="text"
                                id="street"
                                value={street}
                                onChange={(e) => setStreet(e.target.value)}
                            />

                            <label htmlFor="house">Дом:</label>
                            <input
                                type="text"
                                id="house"
                                value={house}
                                onChange={(e) => setHouse(e.target.value)}
                            />

                            <label htmlFor="additionalInfo">Дополнительно:</label>
                            <textarea
                                id="additionalInfo"
                                value={additionalInfo}
                                onChange={(e) => setAdditionalInfo(e.target.value)}
                            />

                                 <button type="submit">Доставить по этому адресу</button>
                        </form>
                        {locationError && <p style={{color: 'red', textAlign: "center"}}>Необходимо заполнить обязательные поля адреса.</p>}
                    </div>
                )}
                {!isUsernameMatch && (
                    <div>
                        <p>ОШИБКА! Имя пользователя не совпадает</p>
                    </div>
                )}
            </div>
            <div className="map-container">
                <div className="yandex-map">
                    {ymaps && (
                        <YMaps query={{apikey: '77eaac79-6bbf-4d9b-b8c7-50c49cf206a9'}}>
                            <Map state={mapState} width="100%" height="100%">
                                {placemarkGeometry && <Placemark geometry={placemarkGeometry}/>}
                            </Map>
                        </YMaps>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
