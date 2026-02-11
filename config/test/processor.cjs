module.exports = {
  prepareOrderData: (requestParams, context, ee, next) => {
    context.vars.userId = "64d0a1234abcde56789f1111"; 

    context.vars.basket = [
      {
        product: "698b0a6bef067dc7303c407f", 
        qty: 1,
        price: 500
      }
    ];

    context.vars.shippingAddress = "64d0a1234abcde56789f0123";

    context.vars.paymentMethod = "COD";
    context.vars.pricing = {
      itemsPrice: 1300,
      shippingPrice: 100,
      totalPrice: 1400
    };

    return next();
  }
};
