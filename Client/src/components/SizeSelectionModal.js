import React from "react";

class SizeSelectionModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedSize: "",
            showSizeWarning: false
        };
    }

    handleSizeSelection = (size) => {
        this.setState({ selectedSize: size });
    };

    handleClickOutside = (event) => {
        const modal = document.querySelector(".size-selection-modal");
        if (modal && !modal.contains(event.target)) {
            this.props.onClose(this.state.selectedSize);
        }
    };

    handleAddToCart = () => {
        if (this.state.selectedSize) {
            this.props.onClose(this.state.selectedSize);
        } else {
            this.setState({ showSizeWarning: true }, () => {

                setTimeout(() => {
                    this.setState({ showSizeWarning: false });
                }, 3500);
            });
        }
    };


    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }

    render() {
        return (
            <div className="size-selection-modal">
                <h2>Выберите размер</h2>
                <ul>
                    {this.props.availableSizes.map((size) => (
                        <li
                            key={size}
                            className={this.state.selectedSize === size ? "selected" : ""}
                            onClick={() => this.handleSizeSelection(size)}
                        >
                            {size}
                        </li>
                    ))}
                </ul>
                <button onClick={this.handleAddToCart}>Добавить в корзину</button>

                <div className={`er-choose-size ${this.state.showSizeWarning ? 'visible' : ''}`}>
                    {this.state.showSizeWarning && <p style={{textAlign: "center"}}>Пожалуйста, выберите размер</p>}
                </div>


            </div>
        );
    }
}

export default SizeSelectionModal;
