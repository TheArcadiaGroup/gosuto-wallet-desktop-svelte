# Gosuto Wallet

## Warning
This version is incompatible with the previous version

## Technologies

Sveltekit + Electron + Tailwindcss 

## Getting Started

> \*Feel free to substitute `npm` with `pnpm` or `yarn`.

|         |                                                                        |
| ------- | ---------------------------------------------------------------------- |
| Install | · `npm install`                                                        |
| Develop | · `npm run dev`                                                        |
| Build   | · `npm run build:all` => Builds Mac (dmg), Windows, and Linux Packages |
| Build   | · `npm run build:mac` => Builds Mac (dmg) package                      |
| Build   | · `npm run build:win` => Builds Windows Package                        |
| Build   | · `npm run build:linux` => Builds Linux Package                        |

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Svelte for VSCode](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode)

## Recommended File Structure

There are several directories one needs to keep in mind when working with the app during development. Al the directories listed below are in the `src` directory and have aliases linked to them allowing for imports done in this manner; `$stores/{FileName}`. Specifically;

- `lib`
  When working in the lib directory, it is important to ensure that only `.svelte` files are in this directory. In particular, these need to be structured using the parent page as the name of the directory. For instance, `.svelte` components associated with the home page, need to be in the `Home` directory. For shared components such as buttons and others, a `components` directory exists in the `lib` directory. Using this approach, components that are aggregations of smaller components can be placed within child directories in the primary `components` directory. For instance, the `Navigation` component has reusable buttons but is in the `Nav` directory within the `components` parent directory.
  Please note that since all of the directories indicated have aliases, they files in these directories can be imported as `$lib/{PageName}/{fileName}.svelte`, or in the case of components `$components/{ComponentName|Directory}/{fileName}.svelte`, etc.
- `routes`
  This directory contains the route files associated with the app.
- `stores`
  This directory includes the stores used across the app. These should be named based on the page or function of the store. i.e. `auth.store.ts` or `history.store.ts`. The `store` suffix is not mandatory but recommended.
- `style`
  All css files used across the application must be in this directory. Since tailwindcss is being used, additional files are not required. However, if need for an additional file arises, it should be placed in this directory.
- `utils`
  This directory contains all the utility functions used across the application. The recommended naming convention is similar to the stores, but with a `util.ts` suffix. While not mandatory, it is highly recommended. Additionally, it is recommended that these be classified based on function. An example of this is all `auth` related utility functions be in a child `auth` directory within the `utils` folder.
- `icons`
  This directory contains all svg icons used across the app, but initialized within `.svelte` components. All these are reusable across the application. The `.svelte` should contain the actual svg content and might expose props to modify the underlying svg such as its fill color, among other attributes of the icon.

## Automatic Formating on Github

The repository currently uses Husky pre-commit hooks to format the code based on the `.prettierrc` file. This automatically kicks in before the files are added to the commit. If successful, a message similar to the one shown in the screenshot below will be shown.
![image](https://user-images.githubusercontent.com/89821717/145913449-fcd7e5c8-ebf8-416c-bf5f-7ab5c32f9be7.png)

## Suggested Component Development Approach

Owing to the fact that there is no theme initialized in the tailwind files, these will have to be added as development proceeds. In this case, one would confirm that the color of the component they want to add does not yet exist and if it doesn't, it should be added to either the `dark` or `light` theme sections in the `tailwind.config.cjs` file in the sections indicated below.

```js
	theme: {
		extend: {
			colors: {
				...require('tailwindcss/defaultTheme').colors,
				// Add other colors (theme here)
				dark: {
					// Light Theme Colors
				},
				light: {
					// Dark Theme Colors
				},
			},
		},
	},
```
