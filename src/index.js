/*
curl \
  -X GET \
  -i \
  -H 'content-type: application/json' \
  localhost:3000
*/

//TODO: Adicionar método setStatus ao response
//TODO: Adicionar método send ao response

import myExpress from "./my-express.js";
import rateLimit from "express-rate-limit";

const PORT = 3000;
const app = myExpress();
const limiter = rateLimit({
	windowMs: 60 * 1000, // 15 minutes
	max: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

// Apply the rate limiting middleware to all requests
app.use(limiter)

app.use((req, res, next) => {
  res.write('all/all\n');
  next();
}, "/api", (req, res, next) => {
  res.write('all/api\n');
  next();
});

app.post("/api", (req, res, next) => {
  res.write('post/all\n');
  next();
});

app.get("/api", (req, res, next) => {
  res.write('get/api\n');
  next();
});

app.use("/", (req, res, next) => {
  res.write('all//\n');
  next();
});

app.listen(PORT, () => console.log(`Running at ${PORT}`));
