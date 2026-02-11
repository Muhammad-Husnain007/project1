import AdminJS from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import * as AdminJSMongoose from '@adminjs/mongoose'

import { UserModel } from '../src/modules/user/models/user.model.js'
import { ProductModel } from '../src/modules/product/models/product.model.js'
import { OrderModel } from '../src/modules/order/models/order.model.js'

// ================= REGISTER ADAPTER =================
AdminJS.registerAdapter({
  Resource: AdminJSMongoose.Resource,
  Database: AdminJSMongoose.Database,
})

// ================= ADMIN OPTIONS =================
const adminOptions = {
  rootPath: '/admin',

  resources: [
    { resource: UserModel },
    { resource: ProductModel },
    { resource: OrderModel },
  ],

  branding: {
    companyName: 'Admin Panel',
    logo: false,
    softwareBrothers: false,
  },
}

const adminJs = new AdminJS(adminOptions)

// ================= HARDCODED ADMIN =================
const ADMIN = {
  username: 'admin',
  password: 'admin123',
}

// ================= AUTH (NO DB) =================
const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
  adminJs,
  {
    authenticate: async (email, password) => {
      console.log('LOGIN TRY:', email, password)

      if (email === 'admin' && password === 'admin123') {
        console.log('LOGIN SUCCESS')
        return { email: 'admin' } // ⚠️ MUST return object
      }

      console.log('LOGIN FAILED')
      return null
    },

    cookieName: 'adminjs',
    cookiePassword: '12345678901234567890123456789012',
  },
  null,
  {
    resave: false,
    saveUninitialized: false,
    secret: '12345678901234567890123456789012',
  }
)


export { adminJs, adminRouter }
