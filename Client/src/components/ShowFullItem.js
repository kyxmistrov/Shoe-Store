import React, { Component } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import StarRating from "./StarRating";

export class ShowFullItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedSize: null,
            showSizeWarning: false
        };
    }

    handleHeartClick = () => {
        const { item, onDeleteh, onAddHeart } = this.props;
        const isInOrdersh = this.props.ordersh && this.props.ordersh.some(order => order.id === this.props.item.id);

        if (isInOrdersh) {
            onDeleteh(item.id);
        } else {
            onAddHeart(item);
        }
    };

    handleAddToCart = () => {
        if (this.state.selectedSize) {
            this.props.onAdd({
                ...this.props.item,
                size: this.state.selectedSize
            });


            this.props.toggleShowFullItem();

            setTimeout(() => {
                this.setState({ showSizeWarning: false });
            }, 3500);
        } else {
            this.setState({ showSizeWarning: true });
        }
    };



    render() {
        const { item, onShowItem, onRatingChange, ordersh } = this.props;
        const isInOrdersh = ordersh && ordersh.some(order => order.id === item.id);

        return (
            <div className="full-item">
                <div>
                    {isInOrdersh ? (
                        <FaHeart
                            size={30}
                            className={`add-to-heart in-orderh`}
                            onClick={this.handleHeartClick}
                        />
                    ) : (
                        <FaRegHeart
                            size={30}
                            className={`add-to-heart`}
                            onClick={this.handleHeartClick}
                        />
                    )}
                    <img src={"./img/" + item.img} onClick={() => onShowItem(item)}/>
                    <h2>{item.title}</h2>

                    <StarRating
                        rating={item.rating}
                        onRatingChange={(newRating) => {
                            onRatingChange(item.id, newRating);
                        }}
                    />

                    <p>{item.desc}</p>

                    <div className="size-selection">
                        <h3>Выберите размер:</h3>
                        <div>
                            {item.sizes.map(size => (
                                <button
                                    key={size}
                                    className={this.state.selectedSize === size ? 'selected-size' : ''}
                                    onClick={() => this.setState({selectedSize: size})}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>


                    </div>
                    <div className={`er-choose-size ${this.state.showSizeWarning ? 'visible' : ''}`}>
                        {this.state.showSizeWarning && <p>Пожалуйста, выберите размер</p>}
                    </div>
                    <h1><b>{(+item.price).toLocaleString()}₽</b></h1>

                    <div className='add-to-cart' onClick={this.handleAddToCart} disabled={!this.state.selectedSize}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                             className="bi bi-cart3" viewBox="0 0 16 16">
                            <path
                                d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                        </svg>
                    </div>
                </div>
            </div>
        );
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.showSizeWarning && !prevState.showSizeWarning) {
            // Если предупреждение только что появилось, ждем 3.5 секунды и затем скрываем его
            setTimeout(() => {
                this.setState({ showSizeWarning: false });
            }, 3500);
        }
    }
}

export default ShowFullItem;
