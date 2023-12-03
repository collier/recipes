import {
  createBrowserRouter,
  RouterProvider,
  Link,
  Outlet,
  ScrollRestoration,
} from "react-router-dom";

interface MDXModuleContent {
  default: () => JSX.Element;
  frontmatter: {
    title: string;
    description: string;
    profileImg: string;
  };
}

const recipeModules: Record<string, MDXModuleContent> = import.meta.glob(
  "../content/*.md",
  {
    eager: true,
  },
);

const recipes = Object.entries(recipeModules).map(([key, value]) => ({
  basename: key.split("/").pop()!.split(".")[0],
  Component: value.default,
  frontmatter: value.frontmatter,
}));

const recipeRoutes = recipes.map(({ basename, Component }) => ({
  path: basename,
  Component,
}));

function AppLayout() {
  return (
    <>
      <main className="container p-2">
        <Outlet />
      </main>
      <ScrollRestoration />
    </>
  );
}

function RecipeLayout() {
  return (
    <>
      <Link
        to="/"
        className="text-lg font-medium text-indigo-600 hover:text-indigo-800"
      >
        ← Return Home
      </Link>
      <article className="prose mt-3 prose-headings:font-serif prose-h2:mt-3 prose-li:my-1">
        <Outlet />
      </article>
    </>
  );
}

function IndexPage() {
  return (
    <>
      <h1 className="pb-3 font-serif text-5xl font-bold">Recipes</h1>
      <ul>
        {recipes.map(
          ({ basename, frontmatter: { title, description, profileImg } }) => (
            <li
              key={basename}
              className="border-b border-gray-200 py-2 last:border-0"
            >
              <Link to={basename}>
                <div className="flex items-center space-x-4">
                  <img
                    src={profileImg}
                    height={96}
                    width={96}
                    className="rounded-md"
                  />
                  <div className="min-w-0 flex-1 self-start">
                    <p className="mb-1 text-xl font-bold leading-none">
                      {title}
                    </p>
                    <p className="text-sm">{description}</p>
                  </div>
                </div>
              </Link>
            </li>
          ),
        )}
      </ul>
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    Component: () => <AppLayout />,
    children: [
      { Component: () => <IndexPage />, index: true },
      { Component: () => <RecipeLayout />, children: [...recipeRoutes] },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}

if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose());
}
