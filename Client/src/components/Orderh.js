import React, {Component} from 'react';
import { FaRegTrashCan } from "react-icons/fa6";
import { BsCart3 } from "react-icons/bs";
import SizeSelectionModal from "./SizeSelectionModal";

export class Orderh extends Component {
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
            this.props.onAddToCartFromHeart(itemWithSize);
        }
    };

    render() {
        return (
            <div className='item'>
                <img src={"./img/" + this.props.item.img}/>
                <h2>{this.props.item.title}</h2>
                <p><b>{(+this.props.item.price).toLocaleString()}₽</b></p>
                <FaRegTrashCan className='delete-icon' onClick={() => this.props.onDeleteh(this.props.item.id)}/>
                <BsCart3 className={"from-heart"} onClick={this.handleAddToCart} />
                {this.state.showSizeSelectionModal && (
                    <SizeSelectionModal
                        availableSizes={this.props.item.sizes}
                        onClose={this.handleCloseSizeSelectionModal}
                    />
                )}
            </div>
        );
    }
}

export default Orderh;
