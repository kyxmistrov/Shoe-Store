import React, { Component } from 'react';
import Item from "./Item";

export class Items extends Component {
    handleRatingChange = (itemId, newRating) => {

        const updatedItems = this.props.items.map(item => {
            if (item.id === itemId) {
                item.rating = newRating;
            }
            return item;
        });


        this.props.updateItems(updatedItems);
    };

    render() {

        return (
            <main>
                {this.props.items.map(item => (
                    <Item
                        onDeleteh={this.props.onDeleteh}
                        ordersh={this.props.ordersh}
                        key={item.id}
                        item={item}
                        onShowItem={this.props.onShowItem}
                        onAdd={this.props.onAdd}
                        onAddHeart={this.props.onAddHeart}
                        onRatingChange={newRating => this.handleRatingChange(item.id, newRating)}
                    />
                ))}
            </main>
        )
    }
}

export default Items;
