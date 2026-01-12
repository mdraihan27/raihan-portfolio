export function Nav({ navItems, className, activeKey, onChangeActive }) {
  return (
    <div
      className={`flex flex-col w-[250px] text-lg gap-5 text-left items-start pt-8 ps-8 font-medium border-e border-e-zinc-700 ${
        className ?? ""
      }`}
    >
      {navItems.map((navItem) => (
        <NavItem
          key={navItem.key}
          itemName={navItem.itemName}
          targetRef={navItem.targetRef}
          offset={navItem.offSet ?? navItem.offset ?? 0}
          Icon={navItem.icon}
          type={navItem.type}
          isActive={activeKey === navItem.key}
          onActivate={() => onChangeActive && onChangeActive(navItem.key)}
        />
      ))}
    </div>
  );
}

export function NavItem({ itemName, targetRef, offset, Icon, type, isActive, onActivate }) {
  return (
    <button
      className={`flex items-center gap-2 cursor-pointer transition-transform duration-150 active:scale-95 active:translate-y-[1px] ${
        isActive ? "text-amber-700" : "text-stone-300 hover:text-stone-500 "
      } ${type == "project" ? "ms-8" : ""}`}
      onClick={() => {
        if (!targetRef.current) return;

        const elementTop = targetRef.current.getBoundingClientRect().top;
        const scrollY = window.scrollY + elementTop - offset;

        window.scrollTo({
          top: scrollY,
          behavior: "smooth",
        });

        if (onActivate) {
          onActivate();
        }
      }}
    >
      {Icon && <Icon className="w-4 h-4" />}
      <p>{itemName}</p>
    </button>
  );
}

// export function NavProjectItem({ itemName, targetRef, offset, Icon }) {
//   return (
//     <button
//       className="text-stone-300 ps-8 flex items-center gap-2 cursor-pointer"
//       onClick={() => {
//         if (!targetRef.current) return;

//         const elementTop = targetRef.current.getBoundingClientRect().top;
//         const scrollY = window.scrollY + elementTop - offset;

//         window.scrollTo({
//           top: scrollY,
//           behavior: "smooth",
//         });
//       }}
//     >
//       {Icon && <Icon className="w-4 h-4" />}
//       <p>{itemName}</p>
//     </button>
//   );
// }
