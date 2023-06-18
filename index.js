const mastodon = require('./services/mastodon');
const text = require('./services/text');

const account = ['109536299782193051', '109807760309072887', '109807745379518286'];
const message = ['Here\'s your possum of the hour :)', 'Oh no something\'s gone horribly wrong this hour. It\'s a fox!', 'Oh no something\'s gone horribly wrong this hour. It\'s a red panda!'];
const numbers = process.env.TWILIO_NUMBERS.split(',');

exports.handler = (_event, _context, callback) => {

  // Get possum vs raccoon account and message
  let i = Math.floor(Math.random() * 100) > 0 ? 0 : 1;
  i = i === 0 ? 0 : Math.floor(Math.random() * 2) + 1;

  // Get tweet
  mastodon.get(account[i]).then((statuses) => {

    // Get image url
    let mediaUrl = statuses.data[0]['media_attachments'][0]['url'];

    console.debug(mediaUrl);
    console.debug(numbers);

    // Send to each number
    numbers.forEach(number => text.send(message[i], mediaUrl, number));
  }).catch((err) => {
    throw err;
  });
  callback(null, 'Finished');
};
