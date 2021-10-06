import configData from "./config.json";

module.exports = {
    client: {
        service: {
            url: `${configData.APP_URL}/api/graphql`,
        },
        includes: ['./utils/**/*.{ts,tsx,js,jsx,graphql}'],
    },
};