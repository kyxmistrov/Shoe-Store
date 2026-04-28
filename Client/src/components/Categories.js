import React, {Component} from 'react';
import Item from "./Item";

export class Categories extends Component{
    constructor(props) {
        super(props);
        this.state={
            categories:[]
        }
    }

    componentDidMount() {
        this.fetchCategories(this.props.gender);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.gender !== this.props.gender) {
            this.fetchCategories(this.props.gender);
        }
    }

    fetchCategories(gender) {
        const url = `http://localhost:8080/api/categories/find/categoryIdsByGender/${gender}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const categories = data.map(category => ({
                    key: `${category.id}`,
                    name: `${category.category}`,
                }));
                categories.unshift({ key: 'all', name: 'Все' });
                this.setState({ categories: categories });
            })
            .catch(error => console.error('Ошибка при получении данных:', error));
    }


    render(){
        return (
            <div className='categories'>
                {this.state.categories.map(el =>(
                    <div key={el.key} onClick={()=> this.props.chooseCategory(el.key)}>
                        {el.name}
                    </div>
                ))}
            </div>
        )
    }
}

export default Categories
