const { isSchema } = require('joi');

module.exports = (app, req, res, schema, action, validationType = 'body') => {
  try {
    if (!isSchema(schema)) {
      throw {
        statusCode: 500,
        message: 'Schema not found to validate request',
      };
    }

    const toValidateData = req[validationType];

    const { error: validationFailure } = schema.validate(toValidateData, {
      abortEarly: false,
    });

    if (validationFailure) {
      const errorDetails = validationFailure.details
        .map((error) => error.message)
        .join(', ');

      res
        .status(400)
        .send({ errorEnum: '[validate_error]', message: `${errorDetails}` });
    }
    return action(app, req, res);
  } catch (error) {
    throw error;
  }
};
