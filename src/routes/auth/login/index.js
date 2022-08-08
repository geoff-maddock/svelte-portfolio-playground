import stringHash from 'string-hash'
import * as cookie from 'cookie'
import { v4 as uuid } from 'uuid'
import { Tedis} from 'tedis'

const db = new Tedis({host: "127.0.0.1", port: 6379})

export const POST = async ({ request }) => {
    const form = await request.formData()
    const email = form.get('email')
    const password = form.get('password')
    const name = form.get('name')

    if (!email || !password) {
        return {
          status: 400,
          body: {
            error: 'Email and password is required.',
          },
        }
      }

    if (
        typeof email !== 'string' ||
        typeof password !== 'string' 
      ) {
        return {
          status: 400,
          body: {
            error: 'Email or password are not strings',
          },
        }
      }
    
      const user = JSON.parse(await db.get(email))
      const passwordMatch = user && user.password == stringHash(password)

      if (!user || !passwordMatch) {
          console.log('Wrong credentials');
          return {
              status: 409,
              body: {
                  message: "You entered the wrong credentials"
              }
          }
      }

      return {
        status: 200,
        body: {
            user: { email },
            success: 'Success.'
        },
        headers: {
            'Set-Cookie': cookie.serialize('session_id', email, {
                path: '/',
                httpOnly: true,
                sameSite: 'lax',
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60 * 24 * 30,
            }
          ),
        },
      }
}