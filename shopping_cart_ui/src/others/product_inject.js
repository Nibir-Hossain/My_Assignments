import { products } from './data'
import DomCreation from './domUtility'


let my_products = document.querySelector('.product-info');
let cart = document.querySelector('.show-cart');
let cartItems = document.querySelector('.cart-details-body');
let cart_counter = document.querySelector('.counter');
let priceTag = document.querySelector('.price-title');
let details_body = document.querySelector('.prod-details');
var sum = 0;

export default function Product() {
    var product_ara = [];
    var quantity_ara = [];

    //this part injects the product dom in HTML
    let productDom = "";
    this.populateProduct = () => {
        products.forEach(element => {
            productDom += DomCreation.createCard(element);
            quantity_ara.push(element.qty);
        });
        my_products.innerHTML = productDom;
        showDetailsOnClick();
    }

    //------for showing details on click------//
    function showDetailsOnClick() {
        let details_btn = document.querySelectorAll('.show-details');
        for (var i = 0; i < details_btn.length; i++) {
            details_btn[i].addEventListener('click', (event) => {
                let id = parseInt(event.target.id);
                details_body.innerHTML = DomCreation.createShowDetails(products[id - 1]);
                details_body.style.display = 'flex';
                let close_btn = document.querySelector('.details-close' + id);
                close_btn.addEventListener('click', () => {
                    details_body.style.display = 'none'
                })
            })
        }
    }

    //here starts all the action
    this.populateCart = () => {
        //for showing the cart
        let show_cart = document.querySelector('.the-icon');
        show_cart.addEventListener('click', () => {
            if (cart.style.display == 'block') {
                cart.style.display = 'none';
            }
            else {
                cart.style.display = 'block'
            }
        })
        //for closing the cart
        let close_cart = document.querySelector('.cart-close');
        close_cart.addEventListener('click', () => {
            cart.style.display = 'none';
        })


        //add to cart button
        let add_to_cart = document.querySelectorAll('.add-to-cart');

        for (var i = 0; i < add_to_cart.length; i++) {
            add_to_cart[i].addEventListener('click', (event) => {
                let clicked_id = parseInt(event.target.id);
                product_ara.push(clicked_id - 1);

                hide_addtocart(clicked_id);
                make_the_cart();
                cart_theke_jog_biyog();
                updateCounter();
                increment(clicked_id);
            })
        }
    }

    //--------------hide add to cart----------------//
    function hide_addtocart(id) {
        let add_btn = document.querySelector('.add-cart' + id);
        add_btn.style.display = 'none';
        let inr_dcr_btn = document.querySelector('.btn-action' + id);
        inr_dcr_btn.style.display = 'flex';
    }

    //-------------show add to cart-----------------//
    function show_addtocart(id) {
        let add_btn = document.querySelector('.add-cart' + id);
        add_btn.style.display = 'block';
        let inr_dcr_btn = document.querySelector('.btn-action' + id);
        inr_dcr_btn.style.display = 'none';
    }

    //--------------making the cart----------------//
    function make_the_cart() {
        let items = "";
        product_ara.forEach((index) => {
            items += DomCreation.createCartDetails(products[index]);
        })
        cartItems.innerHTML = items;
    }

    //-----------the increment function------------//
    function increment(id) {
        if (products[id - 1].qty > 0) {
            --products[id - 1].qty;
            ++products[id - 1].cartQty;
            let avail = document.querySelector('.quantity' + id);
            let added = document.querySelector('.item-qty' + id);
            let addedInCart = document.querySelector('.cart-qnty' + id);
            avail.innerHTML = 'Availabe Quantity: ' + products[id - 1].qty.toString();
            added.innerHTML = products[id - 1].cartQty.toString();
            addedInCart.innerHTML = products[id - 1].cartQty.toString();
            sum += parseInt(products[id - 1].price);
            updatePrice(sum);
        }
    }

    //----------the decrement function------------//
    function decrement(id) {
        if (products[id - 1].cartQty > 0) {
            --products[id - 1].cartQty;
            ++products[id - 1].qty;
            let avail = document.querySelector('.quantity' + id);
            let added = document.querySelector('.item-qty' + id);
            let addedInCart = document.querySelector('.cart-qnty' + id);
            avail.innerHTML = 'Availabe Quantity: ' + products[id - 1].qty.toString();
            added.innerHTML = products[id - 1].cartQty.toString();
            addedInCart.innerHTML = products[id - 1].cartQty.toString();
            sum -= parseInt(products[id - 1].price);
            updatePrice(sum);
        }
        if (products[id - 1].cartQty == 0) {
            show_addtocart(id);
            let ind = product_ara.indexOf(id - 1);
            product_ara.splice(ind, 1);
            make_the_cart();
            updateCounter();
            cart_theke_jog_biyog();
        }
    }

    //------cancel from the cart cross icon-------//
    function cancel(id) {
        products[id - 1].qty = 5;
        let avail = document.querySelector('.quantity' + id);
        avail.innerHTML = 'Availabe Quantity: ' + products[id - 1].qty.toString();
        sum -= parseInt(products[id - 1].price) * products[id - 1].cartQty;
        products[id - 1].cartQty = 0;
        updatePrice(sum);
        show_addtocart(id);
        let ind = product_ara.indexOf(id - 1);
        product_ara.splice(ind, 1);
        make_the_cart();
        updateCounter();
        cart_theke_jog_biyog();
    }

    //-----------cart theke barano komano-----------//
    function cart_theke_jog_biyog() {
        let jog_btn = document.querySelectorAll('.cart-e-jog');
        for (var i = 0; i < jog_btn.length; i++) {
            jog_btn[i].addEventListener('click', (event) => {
                let id = parseInt(event.target.id);
                increment(id);
            })
        }
        let biyog_btn = document.querySelectorAll('.cart-e-biyog');
        for (var i = 0; i < biyog_btn.length; i++) {
            biyog_btn[i].addEventListener('click', (event) => {
                let id = parseInt(event.target.id);
                decrement(id);
            })
        }
        let cancel_btn = document.querySelectorAll('.item-cancel');
        for (var i = 0; i < cancel_btn.length; i++) {
            cancel_btn[i].addEventListener('click', (event) => {
                let id = parseInt(event.target.id);
                cancel(id);
            })
        }
    }

    //---------cart icon counter---------//
    function updateCounter() {
        cart_counter.innerHTML = product_ara.length;
    }

    //--------total price section--------//
    function updatePrice(price) {
        priceTag.innerHTML = price;
        sum = price;
    }

    this.populateCartItems = () => {
        let plus = document.querySelectorAll('.barano');
        let minus = document.querySelectorAll('.komano');
        for (var i = 0; i < plus.length; i++) {
            plus[i].addEventListener('click', (event) => {
                let id = parseInt(event.target.id);
                increment(id);
            })
        }
        for (var i = 0; i < minus.length; i++) {
            minus[i].addEventListener('click', (event) => {
                let id = parseInt(event.target.id);
                decrement(id);
            })
        }
    }
}