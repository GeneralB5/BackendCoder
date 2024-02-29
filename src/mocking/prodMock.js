import { faker } from "@faker-js/faker"
const generateProd = ()=>{
    const FC = faker.commerce
    return {   
title: FC.productName(),
price: FC.price(),
stock: faker.string.numeric({length:{min:1 , max:2}}),
thumbnail: faker.image.url() ,
description: FC.productDescription() ,
status: true ,
code: FC.isbn({ variant: 13, separator: ' ' }) ,
category:FC.department()
    }
}
export default generateProd