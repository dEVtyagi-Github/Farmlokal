const redis = require('../config/redis');
const productRepo = require('../repositories/product.repository');

exports.getProducts = async (params) => {
  const cacheKey = `products:${JSON.stringify(params)}`;

  const cached = await redis.get(cacheKey);
  if (cached) {
    return JSON.parse(cached);
  }

  const products = await productRepo.getProducts(params);

  await redis.set(cacheKey, JSON.stringify(products), 'EX', 60); // 60 sec TTL

  return products;
};
