---
title: Configuration
href: /documentation/sdk/configuration
description: TODO write some description
---

# {% $frontmatter.title %}

You can configure the SDK behavior to your needs with the `inlang.config.js` file. This file is located in the root of your project. Just add the `sdkPlugin` and configure it to your project's needs.

```js
/**
 * @type { import("@inlang/core/config").DefineConfig }
 */
export async function defineConfig(env) {
	const { default: sdkPlugin } = await env.$import(
		"https://cdn.jsdelivr.net/npm/@inlang/sdk-js@0.1.1/dist/plugin/index.js",
	)

	return {
		referenceLanguage: "en",
		plugins: [
			sdkPlugin({
				languageNegotiation: {
					strategies: [
						{ type: "localStorage" }
					],
				},
			}),
		],
	}
}
```

## Configuration options

> There are limited configuration options for now. We will add more options in the coming weeks.

### languageNegotiation

The `languageNegotiation` property makes it possible to customize the behavior how you application detects the language of the user.

#### strategies

You can choose between different strategies to detect the language of the user. You can specify multiple strategies. The first strategy that returns a language will be used.

##### **localStorage**

Detects if the `language` key is set in the localStorage and uses it as the language for the application.

```js
{
	strategies: [
		{ type: "localStorage" },
	],
},
```

###

##### **url**

Detects the `language` by looking at the first segment of the url e.g. `/en/about`

```js
{
	strategies: [
		{ type: "url" },
	],
},
```

---

_Is something unclear or do you have questions? Reach out to us in our [Discord channel](https://discord.gg/9vUg7Rr) or open a [Discussion](https://github.com/inlang/inlang/discussions) or an [Issue](https://github.com/inlang/inlang/issues) on [Github](https://github.com/inlang/inlang)._