const Sidebar = ({ title = "Admin Dashboard", menuItems = [] }) => {
  return (
    <aside className="hidden w-64 bg-blue-600 p-6 text-white md:block">
      <h2 className="mb-8 text-2xl font-bold">{title}</h2>
      <nav>
        <ul>
          {menuItems.map((item, index) => (
            <li key={index} className="mb-4">
              <a href={item.href} className="text-white">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
