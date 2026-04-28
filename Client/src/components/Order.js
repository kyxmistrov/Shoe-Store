import React from "react";
import { FaRegTrashAlt, FaMinus, FaPlus } from "react-icons/fa";

export default function Order(props) {
    const handleIncrement = () => {
        props.onIncrement(props.item.id, props.item.size);
    };

    const handleDecrement = () => {
        props.onDecrement(props.item.id, props.item.size);
    };

    return (
        <div className='item'>
            <div className="item-details">
                <img src={"./img/" + props.item.img} alt={props.item.title} />
                <div className="item-info">
                    <h2>{props.item.title}</h2>
                    <div className='size'>Размер: <u>{props.item.size}</u></div>
                    <p><b>{(+props.item.price * props.item.quantity).toLocaleString()}₽</b></p>
                </div>
            </div>
            <FaRegTrashAlt className='delete-icon' onClick={() => props.onDelete(props.item.id, props.item.size)} />

            <div className='quantity'>
                <button onClick={handleDecrement}>
                    <FaMinus/>
                </button>

                <span style={{ marginTop: "-5px" }}>{props.item.quantity}</span>

                <button onClick={handleIncrement}>
                    <FaPlus/>
                </button>
            </div>
        </div>
    );
}
