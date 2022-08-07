import { Tedis } from 'tedis'

const db = new Tedis({host: '127.0.0.1', port: 6379})

export async function get({context}) {
    console.log('getting user')
    if (!context.authenticated) {
        return {
            status: 402,
            body: {
                message: 'Unauthorized user'
            }
        }
    }

    const user = JSON.parse(await db.get(context.email))

    if (!user) {
        return {
            status: 404,
            body: {
                message: 'User not found'
            }
        }
    }

    delete user.password

    return {
        status: 200,
        body: user
    }
}