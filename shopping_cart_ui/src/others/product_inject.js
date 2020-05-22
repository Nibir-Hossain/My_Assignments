import { products } from './data'
import DomCreation from './domUtility'


let my_products = document.querySelector('.product-info');
let cart = document.querySelector('.show-cart');
let cart_counter = document.querySelector('.counter');
// let details_body = document.querySelector('.prod-details');
var product_ara = [];
var quantity_ara = [];

export default function Product() {

    //this part injects the product dom in HTML
    let productDom = "";
    this.populateProduct = () => {
        products.forEach(element => {
            productDom += DomCreation.createCard(element);
            quantity_ara.push(element.qty);
        });
        my_products.innerHTML = productDom;

        // let details_btn = document.querySelectorAll('.show-details');
        // showDetailsOnClick(details_btn);
    }

    // function showDetailsOnClick(details_btn) {
    //     let product_details = "";

    //     for (var i = 0; i < details_btn.length; i++) {
    //         details_btn[i].addEventListener('click', (event) => {
    //             let id = event.target.id;
    //             let pro_id=parseInt(id);

    //             product_details = DomCreation.createShowDetails(products[pro_id-1]);
    //             details_body.innerHTML = product_details;

    //             details_body.style.display = 'flex';
    //             let close_icon = document.querySelectorAll('.details-close');
    //             close_icon[0].addEventListener('click', () => {
    //                 details_body.style.display = 'none';
    //             })
    //         })
    //     }
    // }

    //webstorage declaration
    // function WebStorage() {
    //     this.getData = (name, initValue) => {
    //         const data = sessionStorage.getItem(name);
    //         return data && IsJsonString(data) ? JSON.parse(data) : initValue;
    //     };

    //     this.setData = (name, data) => {
    //         const jsonString = JSON.stringify(data);
    //         sessionStorage.setItem(name, jsonString);
    //     };

    //     function IsJsonString(str) {
    //         try {
    //             JSON.parse(str);
    //         } catch (e) {
    //             return false;
    //         }
    //         return true;
    //     }
    // }

    //updates product quantity
    // function updateProductQuantity() {
    //     let storage = new WebStorage();
    //     for (var i = 0; i < products.length; ++i) {
    //         let x = i.toString();
    //         let y = "count" + x;
    //         let val = storage.getData(x);
    //         let val2 = storage.getData(y);
    //         if (val == 1) {
    //             products[i]["qty"] = val2;
    //         }
    //     }
    // }

    //cart section
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

        //add to cart button action
        let add_to_cart = document.querySelectorAll('.add-to-cart');

        for (var i = 0; i < add_to_cart.length; i++) {
            add_to_cart[i].addEventListener('click', (event) => {
                let prod_id = parseInt(event.target.id);
                let ind = prod_id - 1;
                let add_btn = document.getElementById(prod_id);
                let plus_minus = document.querySelector('.btn-action' + prod_id);
                let added_quantity = document.querySelector('.item-qty' + prod_id);
                let avail_quantity = document.querySelector('.quantity' + prod_id);
                ++products[ind].cartQty;

                // console.log('Cart quantity starts at: ' + products[ind].cartQty);

                add_btn.style.display = 'none';
                plus_minus.style.display = 'flex';
                product_ara.push(ind);
                cart_counter.innerHTML = product_ara.length;
                // console.log(prod_id + 'is clicked');
                // console.log('quantity: ' + prod_id + ' ' + products[ind].cartQty);

                added_quantity.innerHTML = products[ind].cartQty;
                avail_quantity.innerHTML = 'Availabe Quantity: ' + (quantity_ara[ind] - products[ind].cartQty).toString();

                make_the_cart();
                bodyTeKomBeshi();
                carteKomBeshi();
                // increment(prod_id);
                // decrement(prod_id);
                updateTotalPrice();
            })
        }
    }

    function make_the_cart() {
        console.log('I am make the cart');

        let cart_body = document.querySelector('.cart-details-body');
        let individual_items = "";
        product_ara.forEach((element) => {
            individual_items += DomCreation.createCartDetails(products[element]);
        })
        cart_body.innerHTML = individual_items;
    }

    //item increment
    // function increment(id) {
    //     // console.log(id + 'is clicked');

    //     let indx = id - 1;
    //     let adding = document.querySelector('.barano' + id);
    //     let added = document.querySelector('.item-qty' + id);
    //     let available = document.querySelector('.quantity' + id);

    //     adding.addEventListener('click', () => {
    //         if (products[indx].cartQty < quantity_ara[indx]) {
    //             ++products[indx].cartQty;
    //             added.innerHTML = products[indx].cartQty;
    //             available.innerHTML = 'Availabe Quantity: ' + (quantity_ara[indx] - products[indx].cartQty).toString();
    //             // console.log(products[indx].cartQty);
    //             console.log('I am inside increment and Id is ' + id);
    //             console.log('I am inside increment and Quantity is ' + products[indx].cartQty);

    //             make_the_cart();
    //             updateTotalPrice();
    //         }
    //     })
    // }

    //item decrement
    // function decrement(id) {
    //     // console.log(id + 'is clicked');

    //     let indx = id - 1;
    //     let removing = document.querySelector('.komano' + id);
    //     let removed = document.querySelector('.item-qty' + id);
    //     let available = document.querySelector('.quantity' + id);

    //     removing.addEventListener('click', () => {
    //         if (products[indx].cartQty > 0) {
    //             --products[indx].cartQty;
    //             removed.innerHTML = products[indx].cartQty;
    //             available.innerHTML = 'Availabe Quantity: ' + (quantity_ara[indx] - products[indx].cartQty).toString();
    //             // console.log(products[indx].cartQty);
    //         }
    //         if (products[indx].cartQty == 0) {
    //             let to_remove = product_ara.indexOf(indx);
    //             product_ara.splice(to_remove, 1);
    //             cart_counter.innerHTML = product_ara.length;
    //             show_add_btn(id);
    //         }
    //         make_the_cart();
    //         updateTotalPrice();
    //     })
    // }

    function show_add_btn(id) {
        let add_cart_btn = document.querySelector('.add-cart' + id);
        let plus_minus = document.querySelector('.btn-action' + id);
        add_cart_btn.style.display = 'block';
        plus_minus.style.display = 'none';
    }

    function bodyTeKomBeshi() {
        console.log('I am bodytekombeshi');

        let barano = document.querySelectorAll('.barano');
        let komano = document.querySelectorAll('.komano');

        for (var i = 0; i < barano.length; i++) {
            barano[i].addEventListener('click', (event) => {
                // console.log('I am clicked when quantity is: ' + products[id - 1].cartQty);
                let id=parseInt(event.target.id);
                incr(id);
            })
        }
        for (var i = 0; i < komano.length; i++) {
            komano[i].addEventListener('click', (event) => {
                // console.log('I am clicked when quantity is: ' + products[id - 1].cartQty);
                let id=parseInt(event.target.id);
                dcr(id);
            })
        }
    }

    function carteKomBeshi() {
        console.log('I am cartekombeshi');

        let barano = document.querySelectorAll('.cart-e-jog');
        let komano = document.querySelectorAll('.cart-e-biyog');
        for (var i = 0; i < barano.length; i++) {
            barano[i].addEventListener('click', (event) => {
                console.log('I am clicked');
                let id = parseInt(event.target.id);

                incr(id);
            })
        }
        for (var i = 0; i < komano.length; i++) {
            komano[i].addEventListener('click', (event) => {
                console.log('I am clicked');
                let id = parseInt(event.target.id);

                dcr(id);
            })
        }
    }

    function incr(id) {
        let indx = id - 1;
        // let added = document.querySelector('.item-qty' + id);
        let available = document.querySelector('.quantity' + id);
        console.log('Before Processing quantity is: ' + products[indx].cartQty);


        if (products[indx].cartQty < quantity_ara[indx]) {
            ++products[indx].cartQty;
            added.innerHTML = products[indx].cartQty;
            available.innerHTML = 'Availabe Quantity: ' + (quantity_ara[indx] - products[indx].cartQty).toString();
            // console.log(products[indx].cartQty);
            // console.log('I am inside increment and Id is ' + id);
            // console.log('I am inside increment and Quantity is ' + products[indx].cartQty);

        }
        make_the_cart();
        updateTotalPrice();
        console.log('After Processing quantity is: ' + products[indx].cartQty);

    }

    function dcr(id) {
        let indx = id - 1;
        let removed = document.querySelector('.item-qty' + id);
        let available = document.querySelector('.quantity' + id);
        console.log('Before Processing quantity is: ' + products[indx].cartQty);

        if (products[indx].cartQty > 0) {
            --products[indx].cartQty;
            removed.innerHTML = products[indx].cartQty;
            available.innerHTML = 'Availabe Quantity: ' + (quantity_ara[indx] - products[indx].cartQty).toString();
            // console.log(products[indx].cartQty);
        }
        if (products[indx].cartQty == 0) {
            let to_remove = product_ara.indexOf(indx);
            product_ara.splice(to_remove, 1);
            cart_counter.innerHTML = product_ara.length;
            show_add_btn(id);
        }
        make_the_cart();
        updateTotalPrice();
        console.log('After Processing quantity is: ' + products[indx].cartQty);
    }

    function updateTotalPrice() {
        let price_body = document.querySelector('.price-title');
        let sum = 0;
        product_ara.forEach((element) => {
            sum += products[element].cartQty * products[element].price;
        })
        price_body.innerHTML = sum;
    }
}