const c = [
	() => import("../../../src/routes/__layout.svelte"),
	() => import("../components/error.svelte"),
	() => import("../../../src/routes/index.svelte"),
	() => import("../../../src/routes/blogs/index.svelte"),
	() => import("../../../src/routes/blogs/[blog].svelte"),
	() => import("../../../src/routes/auth/register.svelte"),
	() => import("../../../src/routes/auth/login.svelte"),
	() => import("../../../src/routes/[page]/[page].svelte"),
	() => import("../../../src/routes/[page].svelte")
];

const d = decodeURIComponent;

export const routes = [
	// src/routes/index.svelte
	[/^\/$/, [c[0], c[2]], [c[1]]],

	// src/routes/blogs/index.svelte
	[/^\/blogs\/?$/, [c[0], c[3]], [c[1]]],

	// src/routes/blogs/[blog].svelte
	[/^\/blogs\/([^/]+?)\/?$/, [c[0], c[4]], [c[1]], (m) => ({ blog: d(m[1])})],

	// src/routes/auth/register.svelte
	[/^\/auth\/register\/?$/, [c[0], c[5]], [c[1]]],

	// src/routes/auth/login.svelte
	[/^\/auth\/login\/?$/, [c[0], c[6]], [c[1]]],

	// src/routes/[page]/[page].svelte
	[/^\/([^/]+?)\/([^/]+?)\/?$/, [c[0], c[7]], [c[1]], (m) => ({ page: d(m[1]), page: d(m[2])})],

	// src/routes/[page].svelte
	[/^\/([^/]+?)\/?$/, [c[0], c[8]], [c[1]], (m) => ({ page: d(m[1])})]
];

// we import the root layout/error components eagerly, so that
// connectivity errors after initialisation don't nuke the app
export const fallback = [c[0](), c[1]()];