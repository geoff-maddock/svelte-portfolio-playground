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

  if (!email || !password) {
    return {
      status: 400,
      body: {
        error: 'Email and password is required.',
      },
    }
  }

  try {

    const user = JSON.parse(await db.get(email))

    if (user) {
        console.log('User already exists');
        return {
            status: 409,
            body: {
                error: "User with that email already exists"
            }
        }
    }

    await db.set(email, JSON.stringify({
        email: email,
        password: stringHash(password),
        name: name
    }))

    return {
      status: 200,
      body: { success: 'Success.' },
    }
  } catch (error) {
    return {
      status: 400,
      body: {
        error: 'Error occurred when saving user',
      },
    }
  }
}