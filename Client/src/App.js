import React from "react";
import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Items from "./components/Items";
import Footer from "./components/Footer";
import Categories from "./components/Categories";
import {ShowFullItem} from "./components/ShowFullItem";
import $ from 'jquery';
import Filter from "./components/Filter";
import RegistrationPage from "./RegistrationPage";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CheckoutPage from './CheckoutPage';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            username: localStorage.getItem('username'),
            orders:[],
            ordersh:[],
            currentItems:[],
            items:[],
            showFullItem: false,
            fullItem:{},
            originalItems: [],
            gender: 'all',
            sizes: [],
            selectedSize: '',
            searchQuery: '',

        }
        this.state.currentItems=this.state.items
        this.addToOrder=this.addToOrder.bind(this)
        this.deleteOrder=this.deleteOrder.bind(this)
        this.chooseCategory=this.chooseCategory.bind(this)
        this.onShowItem=this.onShowItem.bind(this)
        this.filterByGender = this.filterByGender.bind(this)
        this.handleSortChange = this.handleSortChange.bind(this)
        this.addToHeart=this.addToHeart.bind(this)
        this.deleteOrderh=this.deleteOrderh.bind(this)

        this.handleDecrement=this.handleDecrement.bind(this)
        this.handleIncrement=this.handleIncrement.bind(this)

        this.updateItems = this.updateItems.bind(this);
    }



    componentDidUpdate(prevProps, prevState) {
        if (prevState.currentItems !== this.state.currentItems) {
            this.handleSortChange(this.state.sortByPrice);
        }
        if (prevState.orders !== this.state.orders) {
            localStorage.setItem('orders', JSON.stringify(this.state.orders));
        }
        if (prevProps.location !== this.props.location) {
            this.fetchData();
        }
    }
    componentDidMount() {
        this.fetchData();
        const savedOrders = localStorage.getItem('orders');
        if (savedOrders) {
            this.setState({ orders: JSON.parse(savedOrders) });
        }
        const savedOrdersh = localStorage.getItem('ordersh');
        if (savedOrdersh) {
            this.setState({ ordersh: JSON.parse(savedOrdersh) });
        }
        const savedUsername = localStorage.getItem('username');
        if (savedUsername) {
            this.setState({ username: savedUsername });
        }
        console.log("user:", this.state.username);
        $.ajax({
            url: 'http://localhost:8080/api/boots/find/all',
            type: 'GET',
            dataType: 'json',
            success: (data) => {
                const transformedData = data.map(async item => {
                    const sizesResponse = await $.ajax({
                        url: `http://localhost:8080/api/size/find/${item.id}`,
                        type: 'GET',
                        dataType: 'json'
                    });
                    const sizes = sizesResponse.map(size => size.size).sort((a, b) => a - b);

                    return {
                        id: item.id,
                        title: `${item.title}`,
                        img: `${item.img}`,
                        desc: `${item.description}`,
                        category: `${item.categoryId.id}`,
                        price: `${item.price}`,
                        gender: `${item.gender}`,
                        brand: `${item.brendId.brend}`,
                        rating: {
                            r1: 0,
                            r2: 0,
                            r3: 0,
                            r4: 0,
                            r5: 0,
                            rat: 0.0
                        },
                        sizes: sizes
                    };
                });

                Promise.all(transformedData).then(transformedItems => {
                    transformedItems.forEach(item => {
                        $.ajax({
                            url: `http://localhost:8080/api/rating/find/${item.id}`,
                            type: 'GET',
                            dataType: 'json',
                            success: (ratingData) => {
                                if (ratingData.length > 0) {
                                    const rating = ratingData[0];

                                    item.rating = {
                                        r1: rating.r1,
                                        r2: rating.r2,
                                        r3: rating.r3,
                                        r4: rating.r4,
                                        r5: rating.r5,
                                        rat: rating.rat
                                    };
                                }
                                this.setState({
                                    items: transformedItems,
                                    originalItems: transformedItems,
                                    currentItems: transformedItems
                                });

                            },
                            error: (xhr, status, error) => {
                                console.error('Ошибка при получении данных рейтинга:', error);
                            }
                        });
                    });
                });
            },
            error: (xhr, status, error) => {
                console.error('Ошибка при получении данных товаров:', error);
            }
        });
        console.log(this.state.items);
    }

    fetchData() {
        const searchParams = new URLSearchParams(window.location.search);
        const username = searchParams.get('username');
        if (username) {
            this.setState({ username: username }, () => {
                console.log('user:', this.state.username);
                localStorage.setItem('username', username);
            });
            const newUrl = window.location.pathname;
            window.history.pushState({}, '', newUrl);
        }
    }

    handleSearchChange = (event) => {
        const searchQuery = event.target.value.toLowerCase();
        let filteredItems;

        if (this.state.items.length > 0) {
            filteredItems = this.state.items.filter(item => {
                return item.title.toLowerCase().includes(searchQuery);
            });
            if (filteredItems.length === 0) {
                filteredItems = this.state.items.filter(item => {
                    return item.brand.toLowerCase().includes(searchQuery);
                });
            }
            if (filteredItems.length === 0) {
                filteredItems = this.state.items.filter(item => {
                    return item.desc.toLowerCase().includes(searchQuery);
                });
            }
        }

        this.setState({ currentItems: filteredItems, searchQuery });
    }




    updateItems(updatedItems) {
        this.setState({ items: updatedItems});
        console.log('Items:', updatedItems);
    }

    render() {

        const settings = {
            dots: true,
            infinite: true,
            speed: 1500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 5000,
            fade: true,
        };
        return (
            <Router>
                <Routes>
                    <Route path="/" element={
                        <div className='wrapper'>
                            <Header
                                username={this.state.username}
                                quantity={this.state.orders.reduce((total, order) => total + order.quantity, 0)}
                                addToCartFromHeart={this.addToCartFromHeart} onDeleteh={this.deleteOrderh}
                                ordersh={this.state.ordersh} orders={this.state.orders} onDelete={this.deleteOrder}
                                filterByGender={this.filterByGender}
                                onIncrement={this.handleIncrement}
                                onDecrement={this.handleDecrement}
                            />


                            <div className='img-slider'>
                                <Slider  {...settings}>
                                    <div className={"presentation3"}>
                                        <div className={"presentation4"}>
                                            <img src='/banner/98025677140167.5c7ee2d5e1224.jpg' alt="Banner 1"/>
                                        </div>
                                    </div>

                                <div className={"presentation"}>

                                    <div className={"presentation2"}>
                                        <img
                                            src="/banner/1667677158_1-sportishka-com-p-aerobnie-krossovki-oboi-1.jpg"
                                            alt="Banner 2"/>

                                    </div>
                                </div>
                                <div>
                                    <img src="/banner/nike-art-of-a-champion-pack.jpg" alt="Banner 3"/>
                                </div>
                            </Slider>
                        </div>
                        <Filter onSortChange={this.handleSortChange}  onSearchChange={this.handleSearchChange} />
                            <Categories chooseCategory={this.chooseCategory} gender={this.state.gender}/>
                            <Items
                                onDeleteh={this.deleteOrderh}
                                ordersh={this.state.ordersh}
                                onShowItem={this.onShowItem}
                                items={this.state.currentItems}
                                onAdd={this.addToOrder}
                                updateItems={this.updateItems}
                                onAddHeart={this.addToHeart}
                            />
                            {this.state.showFullItem && <ShowFullItem
                                ordersh={this.state.ordersh}
                                onDeleteh={this.deleteOrderh}
                                onAddHeart={this.addToHeart}
                                onAdd={this.addToOrder}
                                onShowItem={this.onShowItem}
                                updateItems={this.updateItems}
                                item={this.state.fullItem}
                                onRatingChange={this.handleRatingChange}
                                toggleShowFullItem={this.toggleShowFullItem}
                            />}

                            <Footer/>

                        </div>}

                    />

                    <Route path="/registration" element={<RegistrationPage/>} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                </Routes>
            </Router>
        )
    }

    handleSortChange(sortBy) {
        const { currentItems } = this.state;

        if (sortBy === 'ascPrice') {
            currentItems.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        } else if (sortBy === 'descPrice') {
            currentItems.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        } else if(sortBy === 'ascRating') {
            currentItems.sort((a, b) => parseFloat(a.rating.rat) - parseFloat(b.rating.rat));
        } else if (sortBy === 'descRating') {
            currentItems.sort((a, b) => parseFloat(b.rating.rat) - parseFloat(a.rating.rat));
        }


        this.setState({ currentItems: currentItems });
    }


    filterByGender(gender) {
        if (gender === 'all') {
            this.setState({
                currentItems: this.state.originalItems,
                items: this.state.originalItems,
                gender: gender,
            });
        } else {
            const filteredItems = this.state.originalItems.filter(item => item.gender === gender);
            this.setState({
                currentItems: filteredItems,
                items: filteredItems,
                gender: gender,
            });
        }
    }




    setGender = (gender) => {
        this.setState({ gender: gender });
    }


    onShowItem(item){
        this.setState({fullItem: item})
        this.setState({showFullItem: !this.state.showFullItem})
    }

    chooseCategory (category){
        if (category==='all'){
            this.setState({currentItems:this.state.items})
            return
        }

        this.setState({
            currentItems: this.state.items.filter(el=>el.category === category)
        })
    }

    /*deleteOrder(id) {
        this.setState({ orders: this.state.orders.filter(el => el.id !== id) });
    }*/

    deleteOrder(itemId, size) {
        const updatedOrders = this.state.orders.filter(
            order => !(order.id === itemId && order.size === size)
        );
        this.setState({ orders: updatedOrders });
    }



    addToOrder(item) {

        const isInArray = this.state.orders.some(
            el => el.id === item.id && el.size === item.size
        );


        if (!isInArray) {
            const newItem = { ...item, quantity: 1 };
            this.setState({ orders: [...this.state.orders, newItem] }, () => {
                console.log("Added to cart:", newItem);
            });
        } else {
            console.log("Item already exists in cart:", item);
        }

          /*let isInArray = false
         this.state.orders.forEach(el => {
             if (el.id === item.id)
                 isInArray = true
         })
         if (!isInArray)
             this.setState({ orders: [...this.state.orders, item] })

         console.log(item);*/
    }

    addToHeart(item) {
        let isInArray = false
        this.state.ordersh.forEach(el => {
            if (el.id === item.id)
                isInArray = true
        })
        if (!isInArray) {
            const updatedOrdersh = [...this.state.ordersh, item];
            localStorage.setItem('ordersh', JSON.stringify(updatedOrdersh));
            this.setState({ ordersh: updatedOrdersh });
        }
    }

    deleteOrderh(id) {

        const updatedOrdersh = this.state.ordersh.filter(el => el.id !== id);

        localStorage.setItem('ordersh', JSON.stringify(updatedOrdersh));
        this.setState({ ordersh: updatedOrdersh });
    }

    handleRatingChange = (itemId, newRating) => {
        const updatedItems = this.state.items.map(item => {
            if (item.id === itemId) {
                item.rating = newRating;
            }
            return item;
        });
        this.setState({ items: updatedItems });
    };

    addToCartFromHeart = (item) => {
        this.addToOrder(item);
    };

    toggleShowFullItem = () => {
        this.setState(prevState => ({
            showFullItem: !prevState.showFullItem
        }));
    };

    handleIncrement(itemId, size) {
        const updatedOrders = this.state.orders.map(order => {
            if (order.id === itemId && order.size === size) {
                return { ...order, quantity: order.quantity + 1 };
            }
            return order;
        });
        this.setState({ orders: updatedOrders });
    }

    handleDecrement(itemId, size) {
        const updatedOrders = this.state.orders.map(order => {
            if (order.id === itemId && order.size === size && order.quantity > 1) {
                return { ...order, quantity: order.quantity - 1 };
            }
            return order;
        });
        this.setState({ orders: updatedOrders });
    }


}



export default App;

