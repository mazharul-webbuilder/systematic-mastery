const orders = [
    { id: 1, customer: "Zayaan", amount: 250, delivered: true },
    { id: 2, customer: "Lammim", amount: 300, delivered: false },
    { id: 3, customer: "Rakib", amount: 150, delivered: true },
    { id: 4, customer: "Zayaan", amount: 400, delivered: false },
];

const users = [
    { id: 101, name: "Zayaan", isActive: true },
    { id: 102, name: "Lammim", isActive: true },
    { id: 103, name: "Rakib", isActive: false },
];

const activeUniqueUser = users.filter(u => u.isActive).map(u => u.name)

let pendingOrderTotal = orders.reduce((t, o) => {
    if (!o.delivered && activeUniqueUser.includes(o.customer)){
        return t += o.amount
    }
    return t
}, 0)

const actUserWithTotal = []
activeUniqueUser.forEach((u) => {
    const totalOrder = orders.reduce((total, order) => {
        if (order.customer === u){
            return total+= order.amount
        }
        return  total
    }, 0)
    actUserWithTotal.push({
        name: u,
        total: totalOrder
    })

})

const topSpender = actUserWithTotal.reduce((highest, current) => {
    if (current.total> highest.total){
        return current
    }
    return  highest
})

// 1. Get all undelivered orders for active users
const undeliveredOrders = orders.filter(
    o => !o.delivered && activeUniqueUser.includes(o.customer)
);

// 2. Async delivery function
function deliverOrder(order) {
    return new Promise(resolve => {
        setTimeout(() => {
            order.delivered = true;
            resolve(order);
        }, 1000);
    });
}

// 3. Deliver all undelivered orders
async function deliverAll() {
    const deliveredOrders = await Promise.all(
        undeliveredOrders.map(order => deliverOrder(order))
    );
    return deliveredOrders;
}

// 4. Create summary after delivery
async function createSummary() {
    const deliveredOrders = await deliverAll();

    const summary = {
        uniqueActiveCustomers: activeUniqueUser,
        pendingAmount: pendingOrderTotal,
        topSpender,
        deliveredOrders: orders, // original orders updated
    };

    console.log(summary);
}

createSummary();


