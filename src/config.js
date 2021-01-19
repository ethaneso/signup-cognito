const config = {
    s3: {
        REGION: "us-east",
        BUCKET: "bucketName",
    },
    apiGateway: {
        REGION: "us-east-1",
        URL: "https:///prod",
    },
    cognito: {
        REGION: "us-east",
        USER_POOL_ID: "us-east-1_xxxx",
        APP_CLIENT_ID: "xxxxxxxx",
        IDENTITY_POOL_ID: "xxxxxxxxxx",
    },
};

export default config;