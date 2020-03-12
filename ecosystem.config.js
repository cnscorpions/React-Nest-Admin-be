module.exports = {
  apps : [{
    name: 'book-admin-be',
    script: 'dist/main.js',

    // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
    args: 'one two',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '100M',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy : {
    production : {
      user : "gavin",
      host : "120.55.47.104",
      ref  : 'origin/master',
      repo : "https://github.com/cnscorpions/React-Nest-Admin-be.git",
      path : "/home/gavin/react-nest-admin/back-end",
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};