const Sequelize = require("sequelize");
const AdminBro = require('admin-bro');
const AdminBroExpress = require('@admin-bro/express');
const AdminBroSequelize = require('@admin-bro/sequelize');
AdminBro.registerAdapter(AdminBroSequelize);
const db = require('./models');
const { authenticate, sessionStorage } = require('./util');

const express = require('express');
const app = express();

const adminBro = new AdminBro({
    rootPath: '/admin',
    loginPath: '/admin/login',
    resources: [
        {   resource: db.users,
            options: {
                actions: {
                    new: {
                        isVisible: false,
                    },
                },
            }
        }, 
        { resource: db.pages },
        { resource: db.media },
        { resource: db.textcontent }
    ],
    branding: {
        companyName: 'Shared Learning',
        softwareBrothers: false,
    }
});

const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
    cookiePassword: 'admin-panel',
    authenticate,
  }, null, sessionStorage);
  app.use(adminBro.options.rootPath, router);
  app.use(adminBro.options.loginPath, router);

app.listen(8080, () => console.log('AdminBro is under localhost:8080/admin'))