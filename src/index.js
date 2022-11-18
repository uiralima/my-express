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
