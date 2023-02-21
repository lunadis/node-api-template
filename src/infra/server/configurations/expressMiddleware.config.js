module.exports = (api) => {
  const cors = require('cors');
  const bodyParser = require('body-parser');

  api.use(bodyParser.json({ limit: '50mb' }));

  api.use(
    cors({
      origin: true,
      credentials: true,
    })
  );
};
