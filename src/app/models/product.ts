export interface Product {
    name: string,
    description: string,
    price: number,
    permalink: string,
    category: {
        categoryId: string,
        category: string
    },
    productImgPath: string,
    isFeatured: boolean,
    isBestSeller: boolean, 
}
