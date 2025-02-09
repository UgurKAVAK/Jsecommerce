export interface Order {
    id: number
    orderDate: Date
    firstName: string
    lastName: string
    phoneNumber: string
    city: string
    addressLine: string
    customerId: string
    orderStatus: number
    orderItems: OrderItem[]
    subTotal: number
    deliveryFree: number
  }
  
  export interface OrderItem {
    id: number
    productId: number
    productName: string
    productImage: string
    price: number
    quantity: number
  }
  