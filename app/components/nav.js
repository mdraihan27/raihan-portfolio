export function Nav({ navItems, className, activeKey, onChangeActive, scrollContainerRef }) {
  return (
    <div
      className={`flex overflow-x-auto no-scrollbar gap-3 px-4 py-3 border-b border-b-zinc-700 text-sm items-center font-medium bg-transparent
        lg:overflow-visible lg:flex-col lg:w-[250px] lg:text-lg lg:gap-5 lg:text-left lg:items-start lg:pt-8 lg:ps-8 lg:border-b-0 lg:border-e lg:border-e-zinc-700 ${
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
          scrollContainerRef={scrollContainerRef}
          onActivate={() => onChangeActive && onChangeActive(navItem.key)}
        />
      ))}
    </div>
  );
}

export function NavItem({
  itemName,
  targetRef,
  offset,
  Icon,
  type,
  isActive,
  scrollContainerRef,
  onActivate,
}) {
  return (
    <button
      className={`flex items-center gap-2 cursor-pointer whitespace-nowrap rounded-full px-3 py-1.5 border border-transparent text-xs sm:text-sm transition-transform duration-150 active:scale-95 active:translate-y-[1px]
        ${
          isActive
            ? "bg-amber-900/40 text-amber-300 border-amber-700/60"
            : "text-stone-200 bg-white/5 hover:bg-white/10 hover:text-stone-50"
        }
        ${type == "project" ? "lg:ms-8" : ""}
        lg:rounded-none lg:px-0 lg:py-0 lg:bg-transparent lg:border-none lg:text-base lg:hover:bg-transparent
        ${isActive ? " lg:text-amber-700" : " lg:text-stone-300 lg:hover:text-stone-500"}`}
      onClick={() => {
        if (!targetRef.current) return;
        const container = scrollContainerRef?.current ?? window;

        const canScrollContainer =
          container !== window && container.scrollHeight > container.clientHeight;

        if (!canScrollContainer) {
          const elementTop = targetRef.current.getBoundingClientRect().top;
          const scrollY = window.scrollY + elementTop - (offset ?? 0);

          window.scrollTo({
            top: scrollY,
            behavior: "smooth",
          });
        } else {
          const elementRect = targetRef.current.getBoundingClientRect();
          const containerRect = container.getBoundingClientRect();
          const currentScrollTop = container.scrollTop;

          const targetScrollTop =
            currentScrollTop + (elementRect.top - containerRect.top) - (offset ?? 0);

          container.scrollTo({
            top: targetScrollTop,
            behavior: "smooth",
          });
        }

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
