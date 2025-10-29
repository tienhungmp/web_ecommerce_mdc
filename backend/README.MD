1. Navigate to the project directory.

```
cd E-commerce-API
```

2. Install the dependencies.

```
npm install 
```

3. Set the environment variables in a .env file in the root directory of the project. 
Example:
```
PORT=5000
MONGO_URL=mongodb://localhost:27017/ecommerce
JWT_SECRET=021c3efcd4419c652785f54b0690e048899714e6db46ca8809f4ef0628870a07
JWT_ACCESS_LIFETIME="15m"
JWT_REFRESH_LIFETIME="7d"

```

4. Start the application.

```
npm run dev

```




