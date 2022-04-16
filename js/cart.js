const productsBtn = document.querySelectorAll('.product__btn');
const cartProductsList = document.querySelector('.cart-content__list');
const cart = document.querySelector('.cart');
const cartQuantity = cart.querySelector('.cart__quantity');
const fullPrice = document.querySelector('.fullprice');
const orderModalOpenProd = document.querySelector('.order-modal__btn');
const orderModalList = document.querySelector('.order-modal__list');
let price = 0;
let productArray = [];
const randomId = () => {
	return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};
const priceWithoutSpaces = (str) => {
	return str.replace(/\s/g, '');
};
const normalPrice = (str) => {
	return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
};
const plusFullPrice = (currentPrice) => {
	return price += currentPrice;
};
const minusFullPrice = (currentPrice) => {
	return price -= currentPrice;
};
const printFullPrice = () =>{
	fullPrice.textContent=`${normalPrice(price)}₸`;
};
const printQuantity = () =>{
	let length = cartProductsList.querySelector('.simplebar-content').children.length;
	cartQuantity.textContent = length;
	length > 0 ? cart.classList.add('active'):cart.classList.remove('active');
};
const generateCartProduct = (img, title, price, id) => {
	return (`
		<li class="cart-content__item">
			<article class="cart-content__product cart-product" data-id="${id}">
				<img src="${img}" alt="" class="image__item">
					<div class="cart-product__text">
						<h3 class="cart-product__title">${title}</h3>
						<span class="cart-product__price">${price}</span>
					</div>
					<button class="cart-product__delete" aria-label="Удалить товар"></button>
			</article>
		</li>
		`);
};
const deleteProducts = (productParent) => {
	let id = productParent.querySelector('.cart-product').dataset.id;
	document.querySelector(`.product[data-id="${id}"]`).querySelector('.product__btn').disabled = false;
	
	let currentPrice = parseInt(priceWithoutSpaces(productParent.querySelector('.cart-product__price').textContent));
	minusFullPrice(currentPrice);
	printFullPrice();
	productParent.remove();

	printQuantity();
};
cartProductsList.addEventListener('click', (e) => {
	if (e.target.classList.contains('cart-product__delete')) {
		deleteProducts(e.target.closest('.cart-content__item'));
	}
});
productsBtn.forEach(el => {
	el.closest('.product').setAttribute('data-id', randomId());

	el.addEventListener('click', (e) => {
		let self = e.currentTarget;
		let parent = self.closest('.product');
		let id = parent.dataset.id;
		let img = parent.querySelector('.product__image').getAttribute('src');
		let title = parent.querySelector('.product__title').textContent;
		let priceString = priceWithoutSpaces(parent.querySelector('.product-price__current').textContent);
		let priceNumber = parseInt(priceWithoutSpaces(parent.querySelector('.product-price__current').textContent));
		console.log(priceNumber);
		//sum
		plusFullPrice(priceNumber);
		//print full price
		printFullPrice();
		//add to cart
		cartProductsList.querySelector('.simplebar-content').insertAdjacentHTML('afterbegin', generateCartProduct(img, title, priceString, id));
		//count and print quantity
		printQuantity();

		//disabled btn
		self.disabled = true;
	});
});
let flag = 0;
orderModalOpenProd.addEventListener('click', (e) => {
	if (flag == 0) {
		orderModalOpenProd.classList.add('open');
		orderModalList.style.display = 'block';
		flag = 1;
	} else {
		orderModalOpenProd.classList.remove('open');
		orderModalList.style.display = 'none';
		flag = 0;
	}
});
const generateModalProduct = (img, title, price, id) => {
	return (`
	<li class="order-modal__item">
		<article class="order-modal__product order-product" data-id="${id}">
			<img src="${img}" alt="" class="order-product__img">
			<div class="order-product__text">
				<h3 class="order-product__title">${title}</h3>
				<span class="order-product__price">${normalPrice(price)}</span>
			</div>
		</article>
	</li>`);
};
const modal = new GraphModal({
	isOpen: (modal) => {
		orderModalList.innerHTML = '';
		console.log('opened');
		let array = cartProductsList.querySelector('.simplebar-content').children;
		let fullprice = fullPrice.textContent;
		let length = array.length;

		document.querySelector('.order-modal__quantity span').textContent = `${length} шт`;
		document.querySelector('.order-modal__summ span').textContent = `${fullprice}`;
		for (item of array) {
			console.log(item)
			let img = item.querySelector('.image__item').getAttribute('src');
			let title = item.querySelector('.cart-product__title').textContent;
			let priceString = priceWithoutSpaces(item.querySelector('.cart-product__price').textContent);
			let id = item.querySelector('.cart-product').dataset.id;

			orderModalList.insertAdjacentHTML('afterbegin', generateModalProduct(img, title, priceString, id));

			let obj = {};
			obj.title = title;
			obj.price = priceString;
			productArray.push(obj);
		}
		console.log(productArray)
	},
	isClose: () => {
		console.log('closed');
	}
});
