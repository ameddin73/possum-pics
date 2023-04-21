const Twitter = require('twitter');

var client = new Twitter({
    consumer_key: process.env.TWITTER_KEY,
    consumer_secret: process.env.TWITTER_SECRET,
    bearer_token: process.env.TWITTER_BEARER,
});

module.exports = {
    get: async function (account) {
        let tweets = await client.get('statuses/user_timeline', {
            screen_name: account,
        });

        return await client.get('statuses/show/' + tweets[0].id_str, {});
    }
}