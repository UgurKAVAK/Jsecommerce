
export interface CardItem{
    productId: number,
    productName: string,
    quantity: number
    imageUrl: string,
    price: number,
}

export interface Card{
    cardId: number,
    customerId: string,
    cardItems: CardItem[]
}
