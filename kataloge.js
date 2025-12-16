let cart = [];
let total = 0;

function addToCart(button) {
    let item = button.parentElement.parentElement;
    let name = item.querySelector('h3').innerText;
    let priceText = item.querySelector('.new-price').innerText;
    let price = parseFloat(priceText);

    //добавляем товар в массив
    cart.push({
        name: name,
        price: price
    });

    //обновляем корзину
    showCart();

    //сообщение
    alert(name + ' добавлен в корзину!');
}

//функция удаления из корзины
function removeFromCart(index) {
    cart.splice(index, 1);
    showCart();
}

function showCart() {
    let cartDiv = document.getElementById('cart-items');
    let totalSpan = document.getElementById('total-price');

    cartDiv.innerHTML = '';
    total = 0;

    //если корзина пуста
    if (cart.length === 0) {
        cartDiv.innerHTML = '<p id="empty-cart-message">Корзина пуста</p>';
        totalSpan.textContent = '0.00';
        return;
    }

    // Добавляем товары
    for (let i = 0; i < cart.length; i++) {
        let item = cart[i];
        total += item.price;

        let itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-price">${item.price.toFixed(2)} руб</div>
            <button class="remove-item" onclick="removeFromCart(${i})">×</button>
        `;

        cartDiv.appendChild(itemDiv);
    }
    updateTotal();
}

function updateTotal() {
    let totalSpan = document.getElementById('total-price');
    let delivery = document.getElementById('delivery');

    let finalTotal = total;


    if (delivery.value === 'courier') {
        finalTotal += 5;
    }

    totalSpan.textContent = finalTotal.toFixed(2);
}


function toggleAddress() {
    let delivery = document.getElementById('delivery');
    let addressDiv = document.getElementById('address-group');

    if (delivery.value === 'courier') {
        addressDiv.style.display = 'block';
    } else {
        addressDiv.style.display = 'none';
    }

    updateTotal();
}

// отправка формы
function submitOrder(event) {
    event.preventDefault();


    let fullname = document.getElementById('fullname').value;
    let phone = document.getElementById('phone').value;
    let email = document.getElementById('email').value;



    if (cart.length === 0) {
        alert('Добавьте товары в корзину!');
        return;
    }


    document.getElementById('submit-btn').style.display = 'none';
    document.getElementById('order-notice').style.display = 'none';
    document.getElementById('success-message').style.display = 'block';

    // очищаем через 3 секунды
    setTimeout(function() {

        document.getElementById('order-form').reset();
        document.getElementById('address-group').style.display = 'none';


        cart = [];
        showCart();


        document.getElementById('submit-btn').style.display = 'block';
        document.getElementById('order-notice').style.display = 'block';
        document.getElementById('success-message').style.display = 'none';
    }, 3000);
}


window.onload = function() {
    showCart();

    document.getElementById('order-form').onsubmit = submitOrder;


    document.getElementById('delivery').onchange = toggleAddress;
};