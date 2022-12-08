/*
curl \
  -X GET \
  -i \
  -H 'content-type: application/json' \
  localhost:3000
*/

//OK: Adicionar método status ao response
//OK: Adicionar método send ao response
// return res.status(429).send("Limit error");
import myExpress from "./my-express.js";

const PORT = 3000;
const app = myExpress();

app.use((req, res, next) => {
  res.write('all/all\n');
  next();
}, "/api", (req, res, next) => {
  res.write('all/api\n');
  next();
});

app.post("/api", (req, res, next) => {
  res.write('post/api\n');
  next();
});

app.get("/api", (req, res, next) => {
  res.write('get/api\n');
  next();
});

app.use("/", (req, res, next) => {
  res.send('all//\n');
});

app.listen(PORT, () => console.log(`Running at ${PORT}`));
