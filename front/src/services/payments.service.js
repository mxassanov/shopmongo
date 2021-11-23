import { request } from './generic.service'

export const getPaymentIntent = data => request({ url: `payments` , method: 'post', data})
