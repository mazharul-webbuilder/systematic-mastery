const orders = [
    {id: 1, customer: "Zayaan", amount: 250, delivered: true},
    {id: 2, customer: "Lammim", amount: 300, delivered: false},
    {id: 3, customer: "Mazharul", amount: 150, delivered: true},
    {id: 4, customer: "Zayaan", amount: 400, delivered: false}
];


const uniqueCustomers = orders.reduce((unique, order) => {
    if (!unique.includes(order.customer)) {
        unique.push(order.customer);
    }
    return unique;
}, []);

const totalAmountDelivered = orders.reduce((total, order) => {
    return order.delivered ? total+= order.amount : total
}, 0)


const getZayaanOrders = orders.filter((order) => order.customer === 'Zayaan')

console.log(uniqueCustomers, totalAmountDelivered, getZayaanOrders)
