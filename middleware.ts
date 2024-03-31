import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const protectedRoutes = createRouteMatcher([
  '/main',
  '/main/upcoming',
  '/main/previous',
  '/main/recordings',
  '/main/personal-room',
  'main/meeting(.*)'
])

export default clerkMiddleware((auth, req) => {
  if (protectedRoutes(req)) auth().protect()
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/(api|trpc)(.*)']
}
