# Simple Web Playground

## 1. Feature
- **Basic auth using JWT**, the backend provides authentication using JWT. After a user logs in, they received a token to access protected routes. The frontend will store the token inside a cookie

- **Protected routes**, backend provides a list of video content links (in this playgroud, embedded Youtube videos) and separates them into free and premium tier. Free-tier content can be accessed without logging in, but premium content cannot.

## 2. Run Local
- Mysql database connection requires a configuration in the backend `.env` file, along with a `ca.pem` certificate file for database authentication inside `/resource/certs/`
- Configuration settings for the frontend should be added to `.env` file
- Run `npm run dev` in terminal for both the backend and frontend