import * as cookie from 'cookie'

export const GET = async () => {
    return {
        status: 303,
        headers: {
            'Set-Cookie': cookie.serialize('session_id', '', {
                path: '/',
                expires: new Date(0),
            }),
            location: '/',
        }
    }
}