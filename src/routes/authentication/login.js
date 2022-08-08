import stringHash from 'string-hash'
import * as cookie from 'cookie'
import { v4 as uuid } from 'uuid'
import { Tedis} from 'tedis'

const db = new Tedis({host: "127.0.0.1", port: 6379})

export async function POST({request}) {
    
    const body = await request.json();
    console.log('about to get user');
    console.log(body)
    const user = JSON.parse(await db.get(body.email))

    if (!user) {
        console.log('User does not exist');

        return {
            status: 401,
            body: {
                message: "Invalid email or password"
            }
        }
    }

    if (user.password !== stringHash(body.password)) {
        console.log('Password is invalid');

        return {
            status: 401,
            body: {
                message: "Invalid email or password"
            }
        }
    }

    const cookieId = uuid()
    console.log('Cookie:' + cookieId)

    await db.set(cookieId, JSON.stringify({
        email: body.email,
        name: body.name
    }))

    const headers = {
        'Set-Cookie': cookie.serialize('session_id', cookieId, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7,
            sameSite: 'lax',
            path: '/'
        })
    }

    console.log('about to return success')

    return {
        status: 200,
        headers,
        body: {
            message: "Success"
        }
    }

}