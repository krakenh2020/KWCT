const webpack = require('webpack');

module.exports = {
    plugins: [
        new webpack.DefinePlugin({
            $ENV: {
                TITLE: JSON.stringify(process.env.TITLE),
                CLIENT_PORT: JSON.stringify(process.env.CLIENT_PORT),
                BACKEND_HOST_NAME: JSON.stringify(process.env.BACKEND_HOST_NAME),
                BACKEND_PORT: JSON.stringify(process.env.BACKEND_PORT),
                SOCKET_IOCLIENT_BASE_URL: JSON.stringify(process.env.SOCKET_IOCLIENT_BASE_URL),                                       
                SOCKET_IO_PORT: JSON.stringify(process.env.SOCKET_IO_PORT),
                KEYCLOAK_URL: JSON.stringify(process.env.KEYCLOAK_URL),  
                KEYCLOAK_REALM: JSON.stringify(process.env.KEYCLOAK_REALM),  
                KEYCLOAK_CLIENT_ID: JSON.stringify(process.env.KEYCLOAK_CLIENT_ID),                
                ORIGIN: JSON.stringify(process.env.ORIGIN),                
                RUNMODE: JSON.stringify(process.env.RUNMODE),
                VC_SCHEMA_INDEX_FILE_URL: JSON.stringify(process.env.VC_SCHEMA_INDEX_FILE_URL),
            }
        })
    ]
};