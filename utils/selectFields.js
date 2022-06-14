module.exports = (obj, fields) => {
  let newObj = {};
  Object.keys(obj).forEach((key) => {
    if (fields.includes(key)) newObj[key] = obj[key];
  });
  return newObj;
};
