export function getOriginalPrice(currentprice: number, discount: number) {
    const originalPrice = currentprice / (1 - (discount / 100));
    return originalPrice.toFixed(2)
}
