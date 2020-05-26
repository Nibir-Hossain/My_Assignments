import './index.css'
import Product from './others/product_inject'

(
    function() {
        let items=new Product();
        items.populateProduct();
        items.populateCart();
        items.populateCartItems();
    }
)();