export default function errorHandler(callback) {
  return (req, res, next) => {
    callback(req, res, next).catch(next);
  };
}
