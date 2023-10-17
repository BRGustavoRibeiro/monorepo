import Footer from "#src/pages/index/Footer.jsx"
import type { JSXElement } from "solid-js"
import EditorHeader from "./EditorHeader.jsx"

const EditorLayout = (props: { children: JSXElement }) => {
	return (
		<div>
			<EditorHeader />
			<div class="max-w-7xl mx-auto">{props.children}</div>
			<Footer />
		</div>
	)
}

export default EditorLayout
