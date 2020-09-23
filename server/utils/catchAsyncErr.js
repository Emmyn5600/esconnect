/* eslint-disable node/no-unsupported-features/es-syntax */
export default (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};
