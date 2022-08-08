import * as cookie from 'cookie'
import { Tedis } from 'tedis'
const db = new Tedis({
    host: '127.0.0.1',
    port: 6379
})


export async function handle({ event, resolve}) {

    const cookieHeader = event.request.headers.get('cookie')
    const cookies = cookie.parse(cookieHeader ?? '')

    console.log('handle called')

    if (!cookies.session_id) {
        event.locals.authenticated = false
        const response = await resolve(event);
        return response
    }
    console.log(cookies.session_id)
    const userSession = JSON.parse(await db.get(cookies.session_id))

    if (userSession) {
        event.locals.authenticated = true
        event.locals.user = { email:userSession.email, name: userSession.name}

    } else {
        event.locals.authenticated = false
    }

    return await resolve(event);
}

export function getSession(event) {

    if (!event.locals.authenticated) {
        return {
            authenticated: false
        }
    } 

    return {
        authenticated: event.locals.authenticated,
        user: {
            email: event.locals.user.email,
            name: event.locals.user.name        
        }

    }
}