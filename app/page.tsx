const pages = [
  {
    name: "Availability Visualizer",
    href: "/availability-visualizer",
  },
];

const pageItems = pages.map((page) => (
  <li className="List__item" key={page.name}>
    <a className="Link" href={page.href}>{page.name}</a>
  </li>
));

export default function Home() {
  return (
    <main className="Main">
      <header className="Section py-12 bg-theme-primary" data-scheme="dark">
        <div className="Section__wrap">
          <h1 className="Heading h1">Welcome!</h1>
        </div>
      </header>
      <section className="Section py-12">
        <div className="Section__wrap">
          <h2 className="Heading h2">Pages</h2>
          <ul className="List List--bullet">
            {pageItems}
          </ul>
        </div>
      </section>
    </main>
  );
}
