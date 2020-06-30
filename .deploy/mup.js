module.exports = {
    servers: {
        one: {
            // TODO: set host address, username, and authentication method
            host: '159.203.26.214',
            username: 'root',
            //password: 'zxc123VBN!'
            pem: '/Users/rainer/.ssh/id_rsa',
            //password: 'zxcvbnm1'
            // or neither for authenticate from ssh-agent
        }
    },

    app: {
        // TODO: change app name and path
        name: 'Starter',
        path: '../',

        servers: {
            one: {},
        },

        buildOptions: {
            serverOnly: true,
        },

        env: {
            // TODO: Change to your app's url
            // If you are using ssl, it needs to start with https://
            ROOT_URL: 'http://159.203.26.214',
            MONGO_URL: 'mongodb://mongodb/meteor',
        },

        docker: {
            // change to 'abernix/meteord:base' if your app is using Meteor 1.4 - 1.5
            image: 'abernix/meteord:node-12-base',
        },

        // Show progress bar while uploading bundle to server
        // You might need to disable it on CI servers
        enableUploadProgressBar: true,

        deployCheckWaitTime: 120,
    },

    mongo: {
        version: '4.2.1',
        servers: {
            one: {}
        }
    },

    // (Optional)
    // Use the proxy to setup ssl or to route requests to the correct
    // app when there are several apps

    // proxy: {
    //   domains: 'mywebsite.com,www.mywebsite.com',

    //   ssl: {
    //     // Enable Let's Encrypt
    //     letsEncryptEmail: 'email@domain.com'
    //   }
    // }
};
