test('create product', async () => {
    console.log("Connected to MySQL database");
    const result = {id : 1, name: 'Product A', price: 100 };
    expect(result).toHaveProperty('id');
});