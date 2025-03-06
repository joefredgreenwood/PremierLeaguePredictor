export { default } from "next-auth/middleware";

export const config = { matcher: ["/about/:path*"] };
// You can only have one middleware per app which is a bit annoying, they recommend using conditionals basically
// https://nextjs.org/docs/messages/nested-middleware
