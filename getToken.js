var request = require('request');
const USER = require('./config');

    var options = { method: 'POST',
      url: 'https://developers.onemap.sg/privateapi/auth/post/getToken',
      headers:
       { 'cache-control': 'no-cache',
         'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' },
      formData: { email: USER.email, password: USER.password } };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);

      console.log(body);
    });
