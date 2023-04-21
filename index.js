const tweet = require('./services/tweet');
const text = require('./services/text');

const account = ['PossumEveryHour','RaccoonEveryHr','RedPandaEveryHr'];
const message = ['Here\'s your possum of the hour :)', 'Oh no something\'s gone horribly wrong this hour. It\'s a raccoon!','Oh no something\'s gone horribly wrong this hour. It\'s a red panda!'];
const numbers = process.env.TWILIO_NUMBERS.split(',');

exports.handler = (event, context, callback) => {

    // Get possum vs raccoon account and message
    let i = Math.floor(Math.random() * 100) > 0 ? 0 : 1;
    i = i === 0 ? 0 : Math.floor(Math.random() * 2) + 1;

    // Get tweet
    tweet.get(account[i]).then((tweet) => {

        // Get image url
        let mediaUrl = tweet['extended_entities']['media'][0]['media_url'];

        console.log(mediaUrl);
        console.log(numbers);

        // Send to each number
        numbers.forEach(number => text.send(message[i], mediaUrl, number));
    }).catch((err) => {
        throw err;
    });
    callback(null, 'Finished');
};
