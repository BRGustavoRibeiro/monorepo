import { dedent } from "ts-dedent"
import { findExport } from "../../ast-transforms/utils/exports.js"
import { addImport, isOptOutImportPresent } from "../../ast-transforms/utils/imports.js"
import { codeToSourceFile, nodeToCode } from "../../ast-transforms/utils/js.util.js"
import type { TransformConfig } from "../vite-plugin/inlang-app.js"
import { InlangSdkException } from "../vite-plugin/exceptions.js"
import { filePathForOutput } from "../vite-plugin/fileInformation.js"
import { transformServerRequestJs } from "./+server.js.js"

export const transformLanguageJson = (filePath: string, config: TransformConfig, code: string) => {
	const sourceFile = codeToSourceFile(code, filePath)

	if (isOptOutImportPresent(sourceFile)) return code

	const fileName = filePathForOutput(config, filePath)

	if (findExport(sourceFile, "GET"))
		throw new InlangSdkException(dedent`
			The file (${fileName}) already contains a 'GET' export.
			Please remove it as 'inlang' needs to inject it's own magic here.
		`)

	const index = sourceFile.getPos()
	if (config.options.isStatic && config.options.resourcesCache === "build-time")
		sourceFile.insertText(
			index,
			dedent`
				export const prerender = true
			`,
		)

	sourceFile.insertText(
		index,
		dedent`
			export const GET = async ({ params: { languageTag } }) => {
				await reloadMessages()
				return json(loadMessages(languageTag) || null)
			}
		`,
	)

	if (config.svelteKit.version || "" >= "1.16.3") {
		addImport(sourceFile, "@inlang/sdk-js/adapter-sveltekit/server", "initState")

		// TODO the relative file path depends on the location of the route folder
		sourceFile.insertText(
			index,
			dedent`
			export const entries = async () => {
				const { languageTags } = await initState()

				return languageTags.map(languageTag => ({ languageTag }))
			}
		`,
		)
	}

	addImport(sourceFile, "@inlang/sdk-js/adapter-sveltekit/server", "loadMessages", "reloadMessages")
	addImport(sourceFile, "@sveltejs/kit", "json")

	return transformServerRequestJs(filePath, config, nodeToCode(sourceFile))
}