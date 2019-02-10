/*Продолжаем реализовывать модуль корзины:
Добавлять в объект корзины выбранные товары по клику на кнопке «Купить» без перезагрузки страницы;
Привязать к событию покупки товара пересчет корзины и обновление ее внешнего вида.

У товара может быть несколько изображений. Нужно:
Реализовать функционал показа полноразмерных картинок товара в модальном окне;
Реализовать функционал перехода между картинками внутри модального окна.
 */
function buildCart(items, cartitems) {
    'use strict';
    var sum = 0;
    var allQuantity = 0;
    var $container = document.getElementById("container");
    $container.innerHTML = "";
    var $products = document.createElement("div");
    $products.classList.add("products");
    $container.appendChild($products);

    if (items && items.length) {
        $products.innerHTML = "Productslist on site:";
        for (var i = 0; i < items.length; i++) {
            var $product = document.createElement("div");
            $product.classList.add("product");
            var $ul = document.createElement("ul");

            for (var prop in items[i]) {
                var $li = document.createElement("li");
                $li.textContent = prop + ": " + items[i][prop];
                $li.id = prop + i;
                $ul.appendChild($li);
                var $button = document.createElement("button");
                $button.id = i;
                $button.innerHTML = "Buy";
                $button.onclick = function (buttonClick) {
                    var id = buttonClick.srcElement.id;
                    var newQuantity = --productList[id].productQuantity;

                    if (newQuantity >= 0) {
                        document.getElementById("productQuantity" + id).innerHTML = "productQuantity: " + newQuantity;
                        var newObj = Object.assign({}, productList[id]);
                        newObj.productQuantity = 1;
                        console.log(newObj);
                        cartList.push(newObj);
                        buildCart(productList, cartList);
                    } else {
                        productList[id].productQuantity = 0;
                        document.getElementById("productQuantity" + id).innerHTML = "productQuantity: " + productList[id].productQuantity;
                        console.log(productList);
                    }
                }
            }
            $product.appendChild($ul);
            $product.appendChild($button);
            $products.appendChild($product);
        }
    } else {
        $products.innerHTML = "";
        var $div = document.createElement("div");
        $div.classList.add("emptyshop");
        $div.textContent = "Shop closed";
        $products.appendChild($div);
    }

    var $cart = document.createElement("div");
    $cart.classList.add("cart");
    $container.appendChild($cart);

    if (cartitems && cartitems.length) {
        $cart.innerHTML = "Products in cart:";
        var $cartImg = document.createElement("i");
        $cartImg.classList.add("fas", "fa-cart-arrow-down")
        $cart.appendChild($cartImg);

        for (var j = 0; j < cartitems.length; j++) {
            var $productInCart = document.createElement("div");
            $productInCart.classList.add("product");
            var $ulInCart = document.createElement("ul");
            sum += +cartitems[j]["productPrice"] * +cartitems[j]["productQuantity"];
            allQuantity += +cartitems[j]["productQuantity"];

            for (var prop in cartitems[j]) {
                var $liInCart = document.createElement("li");
                $liInCart.textContent = prop + ": " + cartitems[j][prop];
                $ulInCart.appendChild($liInCart);
            }
            $productInCart.appendChild($ulInCart);
            $cart.appendChild($productInCart);
        }
        var $sum = document.createElement("div");
        $sum.classList.add("sum");
        $sum.innerHTML = "In cart: " + allQuantity + " products. Price: " + sum + " $";
        $product.appendChild($sum);
    } else {
        $cart.innerHTML = "";
        var $emptycart = document.createElement("div");
        $emptycart.classList.add("emptycart");
        $emptycart.textContent = "Cart is empty";
        var $cartImg = document.createElement("i");
        $cartImg.classList.add("fas", "fa-shopping-cart")
        $emptycart.appendChild($cartImg);
        $cart.appendChild($emptycart);
    }
};

var productList = [
    {
        productName: "Hat",
        productQuantity: "4",
        productPrice: "5",
    },
    {
        productName: "Boots",
        productQuantity: "2",
        productPrice: "8",
    },
    {
        productName: "Chain Mail",
        productQuantity: "1",
        productPrice: "60",
    }
];

var cartList = [];

buildCart(productList, cartList);
