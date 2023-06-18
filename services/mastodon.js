const Mastodon = require("mastodon-api")

const M = new Mastodon({
  access_token: process.env.MASTODON_TOKEN,
  timeout_ms: 60 * 1000,  // optional HTTP request timeout to apply to all requests.
  api_url: 'https://botsin.space/api/v1/', // optional, defaults to https://mastodon.social/api/v1/
})

module.exports = {
  get: async function(account) {
    return await M.get(`accounts/${account}/statuses`, { limit: 1, "only_media": true });
  }
}
