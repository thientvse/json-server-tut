const faker = require('faker');
const fs = require("fs");
// set locale Vietnamese
faker.locale = 'vi';

// random

const randomCategoryList = (n) => {
    
    if (n < 0) return [];
    
    const categoryList = [];

    Array.from(new Array(n)).forEach(() => {
        const category = {
            id: faker.random.uuid(),
            name: faker.commerce.department(),
            createdAt: Date.now(),
            updatedAt: Date.now(),
        };

        categoryList.push(category);
    });

    

    return categoryList;
}

const randomProductList = (categoryList, numberOfProduct) => {
    if (numberOfProduct < 0) return [];

    const productList = [];

    // random data
    for (const category of categoryList) {
        Array.from(new Array(numberOfProduct)).forEach(() => {
            const product = {
                categoryId: category.id,
                id: faker.random.uuid(),
                name: faker.commerce.productName(),
                color: faker.commerce.color(),
                price: Number.parseFloat(faker.commerce.price()),
                description: faker.commerce.productDescription(),
                createdAt: Date.now(),
                updatedAt: Date.now(),
                thumnailUrl: faker.image.imageUrl(400, 400),
                
            };

            productList.push(product);
        });
    }

    return productList;

};

//
(() => {

    const categoryList = randomCategoryList(4);
    const productList = randomProductList(categoryList, 5);

    // prepare db
    const db = {
        categories : categoryList,
        products: productList,
        profile: {
            name: "Po",
        },
    };

    // write to file db
    fs.writeFile('db.json', JSON.stringify(db), () => {
        console.log("Generate data successfully");
    });
})();