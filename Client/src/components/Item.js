import React, { Component } from 'react';
import StarRating from "./StarRating";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import SizeSelectionModal from "./SizeSelectionModal"

export class Item extends Component {
    state = {
        showSizeSelectionModal: false
    };

    handleAddToCart = () => {
        this.setState({ showSizeSelectionModal: true });
    };

    handleCloseSizeSelectionModal = (selectedSize) => {
        this.setState({ showSizeSelectionModal: false });
        if (selectedSize) {
            const itemWithSize = { ...this.props.item, size: selectedSize };
            this.props.onAdd(itemWithSize);
        }
    };

    handleRatingChange = (newRating) => {
        this.props.onRatingChange(newRating);
    };

    handleHeartClick = () => {
        const { item, onDeleteh, onAddHeart } = this.props;
        const isInOrdersh = this.props.ordersh && this.props.ordersh.some(order => order.id === this.props.item.id);

        if (isInOrdersh) {
            onDeleteh(item.id);
        } else {
            onAddHeart(item);
        }
    };

    render() {
        const isInOrdersh = this.props.ordersh && this.props.ordersh.some(order => order.id === this.props.item.id);

        return (
            <div className='item'>
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
                <img src={"./img/" + this.props.item.img} onClick={() => this.props.onShowItem(this.props.item)} />

                <h2>{this.props.item.title}</h2>
                <p>{this.props.item.desc}</p>

                <StarRating
                    rating={this.props.item.rating}
                    onRatingChange={(newRating) => {
                        this.props.onRatingChange(newRating);
                    }}
                />

                <h1><b>{(+this.props.item.price).toLocaleString()}₽</b></h1>
                <div className='add-to-cart' onClick={this.handleAddToCart}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                         className="bi bi-cart3" viewBox="0 0 16 16">
                        <path
                            d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                    </svg>
                </div>

                {this.state.showSizeSelectionModal && (
                    <SizeSelectionModal
                        availableSizes={this.props.item.sizes}
                        onClose={this.handleCloseSizeSelectionModal}
                    />
                )}
            </div>
        )
    }
}

export default Item;
