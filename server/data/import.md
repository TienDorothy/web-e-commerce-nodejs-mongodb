```javascript
  const file = path.join(__dirname, "..", "data", "products.json");
  const jsonData = fs.readFileSync(file);
  const products= JSON.parse(jsonData)
  Product.insertMany(products)
```