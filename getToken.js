var request = require("request");

    var options = { method: 'POST',
      url: 'https://developers.onemap.sg/privateapi/auth/post/getToken',
      headers:
       { 'cache-control': 'no-cache',
         'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' },
      formData: { email: 'hunter@velocity.com.sg', password: '98188729' } };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);

      console.log(body);
    });
