export const orders = JSON.parse(localStorage.getItem('orders')) || []; //if there's no order in local storage, give default value of empty array

export function addOrder(order) {
    orders.unshift(order);
    saveToStorage();
}

function saveToStorage() {
    localStorage.setItem('orders', JSON.stringify(orders));
}