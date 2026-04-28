import React, { Component } from 'react';
import { BsSearch } from "react-icons/bs";

class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchQuery: '',
            sortBy: '',
            isActive: false,
            isSearchVisible: false
        };
        this.handleSortChange = this.handleSortChange.bind(this);
        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.handleFocusOut = this.handleFocusOut.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.toggleSearch = this.toggleSearch.bind(this);
        this.clearSearchQuery = this.clearSearchQuery.bind(this);
    }

    handleSortChange(event) {
        this.setState({ sortBy: event.target.value }, () => {
            this.props.onSortChange(this.state.sortBy);
        });
    }

    toggleDropdown() {
        this.setState(prevState => ({
            isActive: !prevState.isActive
        }));
    }

    handleFocusOut() {
        this.setState({
            isActive: false
        });
    }

    handleSearchChange(event) {
        const searchQuery = event.target.value;
        this.setState({ searchQuery }, () => {
            this.props.onSearchChange(event);
        });
    }

    toggleSearch() {
        this.setState(prevState => ({
            isSearchVisible: !prevState.isSearchVisible
        }), () => {
            if (!this.state.isSearchVisible) {
                this.clearSearchQuery();
                this.props.onSearchChange({ target: { value: '' } });
            }
        });
    }


    clearSearchQuery() {
        this.setState({ searchQuery: '' });
    }

    render() {
        return (
            <div className="filter">
                <label htmlFor="sort">Сортировка :</label>
                <div className={`dropdown ${this.state.isActive ? 'active' : ''}`}>
                    <div className="select" onClick={this.toggleDropdown}>
                        <span>{this.state.sortBy ? (this.state.sortBy === 'ascPrice' ? 'По возрастанию цены' : (this.state.sortBy === 'descPrice' ? 'По убыванию цены' : (this.state.sortBy === 'ascRating' ? 'По возрастанию рейтинга' : 'По убыванию рейтинга'))) : 'Нет'}</span>
                        <i className={`fa fa-chevron-left ${this.state.isActive ? 'active' : ''}`}></i>
                    </div>
                    <input type="hidden" name="sort" value={this.state.sortBy}/>
                    <ul className="dropdown-menu">
                        <li onClick={() => this.handleSortChange({target: {value: 'ascPrice'}})}>По возрастанию цены
                        </li>
                        <li onClick={() => this.handleSortChange({target: {value: 'descPrice'}})}>По убыванию цены</li>
                        <li onClick={() => this.handleSortChange({target: {value: 'ascRating'}})}>По возрастанию
                            рейтинга
                        </li>
                        <li onClick={() => this.handleSortChange({target: {value: 'descRating'}})}>По убыванию
                            рейтинга
                        </li>
                    </ul>
                </div>
                <div className="search">
                    <input
                        type="text"
                        placeholder="Поиск"
                        value={this.state.searchQuery}
                        onChange={this.handleSearchChange}
                        className={this.state.isSearchVisible ? 'active' : ''}
                    />
                    <BsSearch className={"b-search"} onClick={this.toggleSearch}/>
                </div>
            </div>
        );
    }
}

export default Filter;
