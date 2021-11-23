import { request } from './generic.service'

export const getProduct = id => request({ url: `products/${id}` })
export const getProducts = () => request({ url: `products` })
