
import   {auth}  from '@/auth'

export default auth((req)=>{
    const isLoggedIn = !!req.auth
    const pathname  = req.nextUrl.pathname

    const isAuthPage = pathname.startsWith('/signin') || pathname.startsWith('/signup')

    const isProtectedPage = pathname.startsWith('/dashboard')

    if(!isLoggedIn && isProtectedPage){
        return Response.redirect(new URL('/signin', req.url))
    }

    if(isLoggedIn && isAuthPage){
        return  Response.redirect(new URL('/dashboard', req.url))
    }
})

export const config = {
    matcher: ['/dashboard/:path*', '/signin', '/signup']
}