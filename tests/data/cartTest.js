import { addToCart, cart, loadFromStorage } from "../../data/cart.js";

describe('test suite: addToCart', () => {
    it('adds an existing product to the cart', () => {
        spyOn(localStorage, 'setItem'); //order is important, mock setItem first so that the addToCart test doenst add it to the real cart

        spyOn(localStorage, 'getItem').and.callFake(() => { 
            return JSON.stringify([{
                productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1,
                deliveryOptionId: '1'
            }]); //making a Mock of localStorage.getItem('cart') to make the test consistent where cart starts as an empty string
        });
        loadFromStorage(); //after making Mock of cart, we want to loadFromStorage again to update the cart

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1); //check if the cart has 1 item
        expect(localStorage.setItem).toHaveBeenCalledTimes(1); //check how many times localStorage.setItem have been called, check if have been called 1 time
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(2);
    });

    it('adds a new product to the cart', () => {
        spyOn(localStorage, 'setItem'); //order is important, mock setItem first so that the addToCart test doenst add it to the real cart

        spyOn(localStorage, 'getItem').and.callFake(() => { 
            return JSON.stringify([]); //making a Mock of localStorage.getItem('cart') to make the test consistent where cart starts as an empty string
        });
        loadFromStorage(); //after making Mock of cart, we want to loadFromStorage again to update the cart

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1); //check if the cart has 1 item
        expect(localStorage.setItem).toHaveBeenCalledTimes(1); //check how many times localStorage.setItem have been called, check if have been called 1 time
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(1);
    });
});