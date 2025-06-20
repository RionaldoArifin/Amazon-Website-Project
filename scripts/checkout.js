import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts, products, loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
// import '../data/cart-class.js';
// import '../data/backend-practice.js';

async function loadPage(){
    try {
        //manually create an error, throw so we can catch it using catch
        //throw 'error1';

        await loadProductsFetch();

        const value = await new Promise((resolve, reject) => {
            //bcs we're using await in the Promise, if error, it goes to the catch outside instead of .catch from the promise
            //throw 'error2';
            loadCart(() => {
                //reject creates an error in the future, bcs loadCart will finish loading before going to the function inside loadCart, so the throw above it will not work on loadCart
                // reject('error3');
                
                //if we use throw, catch doesnt work
                // throw 'error4';
                
                resolve('value3');
            });
        });  
    } 

    catch (error) {
        console.log('Unexpected error. Please try again later.');
    }

    renderOrderSummary();
    renderPaymentSummary();
}
loadPage();

/*
Promise.all([
    loadProductsFetch(),
    new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });
    })

]).then((values) => {
    console.log(values);
    renderOrderSummary();
    renderPaymentSummary();
});
*/

/*
new Promise((resolve) => {
    loadProducts(() => {
        resolve('value1');
    });

}).then((value) => {
    console.log(value);
    return new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });
    });

}).then(() => {    
    renderOrderSummary();
    renderPaymentSummary();
});
*/

/*
loadProducts(() => {
    loadCart(() => {
        renderOrderSummary();
        renderPaymentSummary();
    });
});
*/