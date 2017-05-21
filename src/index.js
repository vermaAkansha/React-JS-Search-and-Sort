import React from 'react';
import ReactDOM from 'react-dom';

/*class Main extends React.Component{
    render(){
        return (
        <h1>Welcome !!!!!</h1>
        );
    }
}
const rootElement = document.getElementById('root');
ReactDOM.render(<Main />, rootElement);*/

class ProductCategoryRow extends React.Component{
    render(){
        return(<tr><th colSpan="2">{this.props.category}</th></tr>);
    }
}   

class ProductRow extends React.Component{
    render(){
        var name = this.props.product.stocked ? 
                        this.props.product.name :
                        <span style={{color: 'red'}}>
                            {this.props.product.name}
                        </span> 
        return(
            <tr>
                <td>{name}</td>
                <td>{this.props.product.price}</td>
            </tr>
        );
    }
}

class ProductTable extends React.Component{
    render(){
        let productsObj = this.props.products;
        let rows = [];
        let last = null;
        productsObj.map((product) => {
            if(product.name.indexOf(this.props.filterText) === -1 || !product.stocked && this.props.inStockonly) return;
            if(product.category !== last){
                rows.push(<ProductCategoryRow category = {product.category} key= {product.category}/>);
            }
            rows.push(<ProductRow product = {product} key={product.name}/>);
            last = product.category;
            return true;
        });
        return(
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
}

class SearchProduct extends React.Component{
    constructor(props){
        super(props);
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.handleInStockProductsChange = this.handleInStockProductsChange.bind(this);
    }

    handleFilterTextChange(e){
        this.props.onFilterTextInput(e.target.value);
    }

    handleInStockProductsChange(e){
        this.props.onInStockProducts(e.target.checked);
    }

    render(){
        return(
            <div>
                <input type="search" 
                    placeholder="Search..." 
                    value={this.props.filterText}
                    onChange={this.handleFilterTextChange} />
                <p>
                    <input type="checkbox" 
                        checked={this.props.inStockonly}
                        onChange={this.handleInStockProductsChange} />
                    {' '}
                    Only show products in Stock
                </p>
            </div>
        );
    }
}

class FilterableProductTable extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            filterText : '',
            inStockonly : false
        };
        this.handleFilterText = this.handleFilterText.bind(this);
        this.handleInStockProducts = this.handleInStockProducts.bind(this);
    }   

    handleFilterText(filterText){
        this.setState({
            filterText: filterText
        });
    }

    handleInStockProducts(inStockonly){
        this.setState({
            inStockonly: inStockonly
        });
    }
    render(){
        return(
            <div>
                <SearchProduct 
                    filterText = {this.state.filterText}
                    inStockonly = {this.state.inStockonly}
                    onFilterTextInput = {this.handleFilterText}
                    onInStockProducts = {this.handleInStockProducts}/>
                <ProductTable 
                    products={this.props.products}
                    filterText = {this.state.filterText}
                    inStockonly = {this.state.inStockonly}/>
            </div>
        );
    }
}
const PRODUCTS = [  
  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
  {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];

const rootElement = document.getElementById('root');
ReactDOM.render(<FilterableProductTable products={PRODUCTS}/>, rootElement);