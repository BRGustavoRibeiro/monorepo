import { For } from "solid-js"
import { currentPageContext } from "#src/renderer/state.js"
import Link from "#src/renderer/Link.jsx"
import * as m from "#src/paraglide/messages.js"
import { setSearchInput } from "../components/SearchBar.jsx"

const CategoryTabs = () => {
	const getCategories = () => {
		return [
			{
				name: "Apps",
				href: "/c/apps",
			},
			{
				name: "Libraries",
				href: "/c/libraries",
			},
			{
				name: "Plugins",
				href: "/c/plugins",
			},
			{
				name: m.marketplace_header_category_lint(),
				href: "/c/lint-rules",
			},
		]
	}
	return (
		<nav class="max-w-7xl mx-auto flex gap-2 overflow-x-scroll hide-scrollbar items-center">
			<p class="text-sm pr-4 font-regular text-surface-500">Ecosystem:</p>
			<For each={getCategories()}>
				{(link) => (
					<div
						class={
							(currentPageContext.urlParsed.pathname.includes(link.href)
								? "border-hover-primary "
								: "border-background ") +
							" border-b-[2px] py-[4px] text-sm bg-transparent group content-box"
						}
					>
						<Link
							href={link.href}
							onClick={() => setSearchInput("")}
							target={link.href.includes("github.com") ? "_blank" : "_default"}
						>
							<div
								class={
									(currentPageContext.urlParsed.pathname.includes(link.href)
										? "text-primary "
										: "text-surface-600 hover:bg-surface-100 ") +
									" px-2 py-[6px] rounded-md transition-colors font-medium cursor-pointer w-max"
								}
							>
								{link.name}
							</div>
						</Link>
					</div>
				)}
			</For>
		</nav>
	)
}

export default CategoryTabs
