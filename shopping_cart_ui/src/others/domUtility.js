import Product from "./product_inject";

export default class DomCreation {
    static createCard(product) {
        return `
            <div class="card">
                <div class="prod-image">
                    <img class="image-class" src="${product.img}" alt="pc">
                    <span id="${product.id}" class="show-details">Show Details</span>
                </div>
                <div class="prod-title">
                    <h4>${product.title}</h4>
                    <h4 class="title-price">$${product.price}</h4>
                </div>
                <h5 class="quantity quantity${product.id}">Availabe Quantity: ${product.qty}</h5>
                <p class="description">${product.des}</p>
                <div>
                    <button id="${product.id}" class="add-to-cart add-cart${product.id}">Add to Cart</button>
                    <div class="btn-action btn-action${product.id}">
                        <span id="${product.id}" class="inr-dcr komano">-</span>
                        <span class="item-qty item-qty${product.id}">${product.cartQty}</span>
                        <span id="${product.id}" class="inr-dcr barano">+</span>
                    </div>
                </div>
            </div>
        `;
    }

    static createCartDetails(product) {
        return `
            <div class="cart-details">
                <img src="${product.img}" alt="pc">
                <div class="cart-details-title">
                    <h4 style="padding: 2px 4px 2px 4px;">${product.title}</h4>
                    <h5 style="padding: 2px 4px 2px 4px;">$${product.price}</h5>
                    <div class="cart-action">
                        <span id="${product.id}" class="plus-minus cart-e-biyog" type="button">-</span>
                        <span class="cart-qnty cart-qnty${product.id}">${product.cartQty}</span>
                        <span id="${product.id}" class="plus-minus cart-e-jog" type="button">+</span>
                    </div>
                </div>
                <div class="item-cancel">
                    <i id="${product.id}" class="fas fa-times"></i>
                </div>
            </div>
        `;
    }

    static createShowDetails(product) {
        return `
            <img src="${product.img}" alt="pc">
            <div class="details-info">
                <h3>${product.title}</h3>
                <h4>Price: <span>$${product.price}</span></h4>
                <h4>Review: <span>&#9733</span><span>&#9733</span><span>&#9733</span><span>&#9733</span></h4>
                <p>${product.des}</p>
            </div>
            <div class="details-close details-close${product.id}">
                <i class="fas fa-times"></i>
            </div>
        `;
    }
}