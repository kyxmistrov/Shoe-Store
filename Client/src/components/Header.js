import React, { useState, useEffect } from "react";
import Order from "./Order";
import { FaHeart,  FaCircleUser,FaCartShopping } from "react-icons/fa6";
import Orderh from "./Orderh";
import { Link } from "react-router-dom";
import { FaCircleXmark } from "react-icons/fa6";


const Header = (props) => {
    const [cartOpen, setCartOpen] = useState(false);
    const [heartOpen, setHeartOpen] = useState(false);
    const [summa, setSumma] = useState(0);
    const { username } = props;

    useEffect(() => {
        let totalSum = 0;
        props.orders.forEach((el) => {
            totalSum += Number.parseFloat(el.price) * el.quantity;
        });
        setSumma(totalSum);
    }, [props.orders]);

    const handleGenderFilter = (gender) => {
        props.filterByGender(gender);
    };

    const toggleCart = () => {
        setCartOpen(!cartOpen);
        if (heartOpen) {
            setHeartOpen(false);
        }
    };

    const toggleHeart = () => {
        setHeartOpen(!heartOpen);
        if (cartOpen) {
            setCartOpen(false);
        }
    };

    const showOrders = (props) => {
        console.log(summa, username);

        return (
            <div>
                {props.orders.map((el) => (
                    <Order
                        onDelete={props.onDelete}
                        key={el.id}
                        item={el}
                        quantity={el.quantity}
                        onIncrement={props.onIncrement}
                        onDecrement={props.onDecrement}
                    />
                ))}
                <p className="summa">
                    Сумма: {new Intl.NumberFormat().format(summa)}₽
                    {username ? (
                        <Link
                            to={{
                                pathname: '/checkout',
                                search: `?summa=${summa}&username=${username}`
                            }}
                            className={"link-style"}
                        >
                            <button>Оформить заказ</button>
                        </Link>

                    ) : (
                        <Link className={"link-style"} to="/registration">
                            <button>Войдите, чтобы оформить заказ</button>
                        </Link>
                    )}
                </p>
            </div>
        );
    };


    const showOrdersh = (props) => {
        return (
            <div>
                {props.ordersh.map((el) => (
                    <Orderh
                        onAddToCartFromHeart={props.addToCartFromHeart}
                        onDeleteh={props.onDeleteh}
                        key={el.id}
                        item={el}
                    />
                ))}
            </div>
        );
    };
    const handleLogout = () => {
        localStorage.removeItem('username');
        window.location.href = '/';
    };
    const showNothingh = () => {
        return (
            <div className="empty">
                <p>Пусто</p>
            </div>
        );
    };

    const showNothing = () => {
        return (
            <div className="empty">
                <p>Корзина пуста</p>
            </div>
        );
    };

    return (
        <header>
            <div className="header-container">
        <span className="logo" onClick={() => window.location.reload()}>

                Footwear
        </span>

                <ul className="nav">
                    <li onClick={() => handleGenderFilter("all")}>Вся обувь</li>
                    <li onClick={() => handleGenderFilter("Женские")}>Женщинам</li>
                    <li onClick={() => handleGenderFilter("Мужские")}>Мужчинам</li>
                </ul>

                <div className="header-icons">
                    {username ? (
                        <div className={"shop-un-registration-button"} onClick={handleLogout}>
                            <div className="username-container">
                            <p>{username}</p>
                            </div>
                            <FaCircleXmark/>
                        </div>
                    ) : (
                        <Link className={"link-style"} to="/registration">
                            <FaCircleUser className={"shop-registration-button"}/>
                        </Link>
                    )}

                    <FaHeart
                        onClick={toggleHeart}
                        className={`shop-heart-button ${heartOpen && "active"} header-icon`}
                    />
                    <FaCartShopping
                        onClick={toggleCart}
                        className={`shop-cart-button ${cartOpen && "active"} header-icon`}
                    />

                    {props.orders.length > 0 && <span className="item-count-orders">{props.orders.length}</span>}
                    {props.ordersh.length > 0 && <span className="item-count-ordersh">{props.ordersh.length}</span>}
                </div>
            </div>

            {cartOpen && <div className="shop-cart">{props.orders.length > 0 ? showOrders(props) : showNothing()}</div>}

            {heartOpen &&
                <div className={"shop-heart"}>{props.ordersh.length > 0 ? showOrdersh(props) : showNothingh()}</div>}


        </header>

    );
};

export default Header;
