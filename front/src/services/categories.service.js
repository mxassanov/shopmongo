import { request } from './generic.service'

export const getCategory = id => request({ url: `categories/${id}` })
export const getCategories = () => request({ url: `categories` })
