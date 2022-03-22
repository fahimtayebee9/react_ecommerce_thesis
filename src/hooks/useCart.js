const useCart = (cart) => {
    // function for add to cart
    const addToCart = (product) => {
        
        cart.addToCart(product);
    };
    // function for remove from cart
    const removeFromCart = (product) => {
        cart.removeFromCart(product);
    }
    // function for clear cart
    const clearCart = () => {
        cart.clearCart();
    }
    // function for get cart
    const getCart = () => {
        return cart.getCart();
    }
    // function for get cart total
    const getCartTotal = () => {
        return cart.getCartTotal();
    }
}