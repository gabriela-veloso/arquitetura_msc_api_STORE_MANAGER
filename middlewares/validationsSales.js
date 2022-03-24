const validateProductId = (req, res, next) => {
  const noProductId = req.body.some(({ productId }) => !productId);

  if (noProductId) {
    return res.status(400).json({ message: '"productId" is required' });
  }

  next();
};

const validateQuantity = (req, res, next) => {
  const noQuantity = req.body.some(({ quantity }) => !quantity);

  if (noQuantity) {
    return res.status(400).json({ message: '"quantity" is required' });
  }

  const quantityValidNumber = req.body.some(({ quantity }) => quantity <= 0);

  if (quantityValidNumber) {
    return res
      .status(422)
      .json({ message: '"quantity" must be greater than or equal to 1' });
  }

  next();
};

module.exports = { validateProductId, validateQuantity };
