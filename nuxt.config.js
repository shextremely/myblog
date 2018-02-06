const bodyParser = require('body-parser')
const session = require('express-session')

module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: 'myblog',
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Nuxt.js project'
      }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }]
  },
  /*
   ** Customize the progress bar color
   */
  loading: {
    color: '#3B8070'
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** Run ESLint on save
     */
    extend(config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    vendor: ['particles.js', 'axios', 'element-ui', 'highlight.js']
  },

  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000'
  },

  css: [{
      src: '~assets/sass/normalize.scss',
      lang: 'scss'
    },
    'element-ui/lib/theme-default/index.css',
    {
      src: '~assets/sass/style.scss',
      lang: 'scss'
    },
    'highlight.js/styles/github.css',
    {
      src: '~assets/sass/common.scss',
      lang: 'scss'
    },
  ],

  plugins: ['~plugins/element-ui', '~plugins/axios', '~plugins/highlight.js'],

  router: {
    middleware: 'auth'
  },

  /*
   ** Add server middleware
   ** Nuxt.js uses `connect` module as server
   ** So most of express middleware works with nuxt.js server middleware
   */
  serverMiddleware: [
    // body-parser middleware
    bodyParser.json(),
    // session middleware
    session({
      secret: 'super-secret-key',
      resave: true,
      saveUninitialized: true,
      cookie: {
        maxAge: 60000 * 5 * 20
      }
    }),
    // Api middleware
    // We add /api/login & /api/logout routes
    '~/exapi'
  ]
}
