const redisClient = redis.createClient({
  url: 'redis://localhost:6379' // Asegúrate de que Redis esté en ejecución en esta URL
});

redisClient.on('error', (err) => {
  console.error('Error de Redis:', err);
});