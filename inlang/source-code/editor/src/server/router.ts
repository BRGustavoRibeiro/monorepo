/**
 * ------------------------------------
 * This is the main entry point of the server and therefore router.
 *
 * Multiple things come together here:
 *  - express.js that powers the server https://expressjs.com/
 *  - vite-plugin-ssr that powers routing and rendering https://vite-plugin-ssr.com/
 *
 * !Note: This file has not hot module reload. If you change code, you need to restart the server
 * !      by re-running `npm run dev`.
 * ------------------------------------
 */

import express, { Router } from "express"
import { createServer as createViteServer } from "vite"
import { URL } from "node:url"
import { privateEnv } from "@inlang/env-variables"
import sirv from "sirv"
import cookieSession from "cookie-session"
import { router as vikePlugin } from "./vike-plugin.js"
import { router as authService } from "../services/auth/index.server.js"
import { redirects } from "./redirects.js"

/** the root path of the server (website/) */
const rootPath = new URL("../..", import.meta.url).pathname

export const router: Router = express.Router()

router.use(
	cookieSession({
		name: "inlang-session",
		httpOnly: true,
		// secure: isProduction ? true : false,
		// domain: isProduction ? "inlang.com" : undefined,
		sameSite: "strict",
		secret: privateEnv.SESSION_COOKIE_SECRET,
		maxAge: 7 * 24 * 3600 * 1000, // 1 week
	})
)

if (process.env.NODE_ENV === "production") {
	// import server code https://github.com/brillout/vite-plugin-ssr/issues/403
	await import(`${rootPath}/dist/server/importBuild.cjs`)
	router.use(sirv(`${rootPath}/dist/client`))
} else {
	const viteServer = await createViteServer({
		server: { middlewareMode: true },
		root: rootPath,
		appType: "custom",
	})
	// start vite hot module reload dev server
	// use vite's connect instance as middleware
	router.use(viteServer.middlewares)
}

// ------------------------ START ROUTES ------------------------

router.use("/services/auth", authService)

router.use(redirects)

// ! vite plugin ssr must came last
// ! because it uses the wildcard `*` to catch all routes
router.use(vikePlugin)