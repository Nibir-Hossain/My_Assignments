import './index.css'
// import Product from './others/product_inject'
import Product from './others/product_again' 

(
    function() {
        let items=new Product();
        items.populateProduct();
        items.populateCart();
        items.populateCartItems();
    }
)();