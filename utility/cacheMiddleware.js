import NodeCache from 'node-cache';
const cache = new NodeCache({ stdTTL: 60 });

export default function cacheMiddleware(req, res, next) {
  const key = req.originalUrl; // Use URL as the cache key
  const cachedData = cache.get(key);

  if (cachedData) {
    console.log('Cache hit');
    return res.json(cachedData);
  }
  console.log('Cache miss');
  res.sendResponse = res.json;
  res.json = (body) => {
    cache.set(key, body, { stdTTL: 60 }); // Store response in cache
    res.sendResponse(body);
  };
  next();
}