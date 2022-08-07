import * as cookie from 'cookie'
import { Tedis } from 'tedis'
const db = new Tedis({
    host: '127.0.0.1',
    port: 6379
})


export async function handle({ event, resolve}) {

    const cookieHeader = event.request.headers.get('cookie')
    console.log('cookieHeader')
    console.log(cookieHeader)
    const cookies = cookie.parse(cookieHeader ?? '')
    console.log(cookies)

    console.log('handle called')

    if (!cookies.session_id) {
        console.log('no sessionId cookie')
        event.locals.authenticated = false
        const response = await resolve(event);
        return response
    }
    console.log(cookies.session_id)
    console.log('before usersession')
    const userSession = JSON.parse(await db.get(cookies.session_id))
    console.log(userSession)
    console.log('after usersession')

    if (userSession) {
        event.locals.authenticated = true
        event.locals.email = userSession.email
        event.locals.name = userSession.name
    } else {
        event.locals.authenticated = false
    }

    return await resolve(event);
}

export function getSession(event) {

    if (!event.locals.authenticated) {
        return {
            authenticated: event.locals.authenticated
        }
    } 

    return {
        authenticated: event.locals.authenticated,
        email: event.locals.email,
        name: event.locals.name
    }
}