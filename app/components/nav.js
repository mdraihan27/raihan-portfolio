export function Nav({ navItems, className }) {
  return (
    <div>
      {navItems.map((navItem) => (
        <NavItem
          key={navItem.key}
          itemName={navItem.itemName}
          targetRef={navItem.targetRef}
          offset={navItem.offset}
        />
      ))}
    </div>
  );
}

export function NavItem({ itemName, targetRef, offset }) {
  return (
    <button
      className=""
      onClick={() => {
        if (!targetRef.current) return;

        const elementTop = targetRef.current.getBoundingClientRect().top;
        const scrollY = window.scrollY + elementTop - offset;

        window.scrollTo({
          top: scrollY,
          behavior: "smooth",
        });
      }}
    >
      <p>{itemName}</p>
    </button>
  );
}
