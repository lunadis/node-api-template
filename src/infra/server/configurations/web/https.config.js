const https = require('https');
const fs = require('fs');

module.exports = (httpApi, api) => {
  httpApi.get('/.well-known/acme-challenge/:fileName', (req, res) => {
    fs.readFile(
      __dirname + '/.well-known/acme-challenge/' + req.params.fileName,
      'utf8',
      function (err, data) {
        if (err) {
          return console.log(err);
        }
        res.send(data);
      }
    );
  });

  httpApi.listen(apiConfig.port, function () {
    console.log('Server up and running on port ' + apiConfig.port);
  });

  const host =
    process.env.NODE_ENV === 'production'
      ? 'microblog-api.mecanizou.com'
      : 'staging.microblog-api.mecanizou.com';

  // Certificate
  const privateKey = fs.readFileSync(
    '/etc/letsencrypt/live/' + host + '/privkey.pem',
    'utf8'
  );
  const certificate = fs.readFileSync(
    '/etc/letsencrypt/live/' + host + '/cert.pem',
    'utf8'
  );
  const ca = fs.readFileSync(
    '/etc/letsencrypt/live/' + host + '/chain.pem',
    'utf8'
  );

  const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca,
  };

  const httpsServer = https.createServer(credentials, api);

  return httpsServer;
};
