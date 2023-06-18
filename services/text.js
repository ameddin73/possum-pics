const client = require('twilio')(process.env.TWILIO_ACCOUNT, process.env.TWILIO_AUTH);

module.exports = {
  send: function(body, mediaUrl, to) {
    client.messages
      .create({
        body: body,
        mediaUrl: mediaUrl,
        from: '+12543646442',
        to: to,
      })
      .then(message => console.log(message.sid))
      .done();
  }
}
