import { Button } from "#src/pages/index/components/Button.jsx"
import { For, Show, createSignal } from "solid-js"
import UserDropdown from "./UserDropdown.jsx"
import IconClose from "~icons/material-symbols/close-rounded"
import IconMenu from "~icons/material-symbols/menu-rounded"

function EditorHeader() {
	const getLinks = () => {
		return [
			{
				name: `Editor Projects`,
				href: "/editor",
			},
			{
				name: `Apps`,
				href: "/application",
			},
		]
	}

	const [mobileMenuIsOpen, setMobileMenuIsOpen] = createSignal(false)
	return (
		<>
			<header class="sticky top-0 z-[9999] w-full border-b transition-colors bg-transparent border-b-background bg-background">
				<div class="`w-full h-full py-4 px-6 md:px-4 relative z-10">
					<nav class="max-w-[1280px] w-full mx-auto">
						<div class="flex">
							<a href={"/"} class="flex items-center w-fit">
								<img class={"h-9 w-9"} src="/favicon/safari-pinned-tab.svg" alt="Company Logo" />
								<span class={"self-center pl-2 text-left font-semibold text-surface-900"}>
									inlang
								</span>
							</a>
							<div class="w-full content-center">
								<div class="hidden md:flex justify-end items-center gap-8">
									<For each={getLinks()}>
										{(link) => (
											<>
												<Button type="text" href={link.href}>
													{link.name}
												</Button>
											</>
										)}
									</For>
									<Show when={localStorage.user}>
										<UserDropdown />
									</Show>
								</div>
							</div>
							{/* Controll the Dropdown/Navbar  if its open then Show MobileNavMenue */}
							<div class="md:hidden flex items-center">
								<button
									onClick={() => setMobileMenuIsOpen(!mobileMenuIsOpen())}
									type="button"
									class="inline-flex items-center justify-center text-primary "
								>
									<span class="sr-only">{mobileMenuIsOpen() ? "Close menu" : "Open menu"}</span>
									{mobileMenuIsOpen() ? (
										<IconClose class="w-6 h-6" />
									) : (
										<IconMenu class="w-6 h-6" />
									)}
								</button>
							</div>
						</div>
						{/* MobileNavbar includes the Navigation for the Documentations sites  */}
						<Show when={mobileMenuIsOpen()}>
							<ol class="space-y-1 relativ w-full min-h-full pt-3 pl-[10px] overflow">
								<For each={getLinks()}>
									{(link) => (
										<sl-tree>
											<a
												class="link grow min-w-full text-on-surface link-primary w-full"
												href={link.href}
												onClick={() => setMobileMenuIsOpen(!mobileMenuIsOpen())}
											>
												<sl-tree-item>{link.name}</sl-tree-item>
											</a>
										</sl-tree>
									)}
								</For>
							</ol>
						</Show>
					</nav>
				</div>
			</header>
		</>
	)
}

export default EditorHeader
