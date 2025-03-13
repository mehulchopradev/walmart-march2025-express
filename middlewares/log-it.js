export default function logIt(req, res, next) {
  console.log(req.url);
  console.log(req.method);
  console.log(new Date());

  next();
}