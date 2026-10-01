export function Nav({ navItems, className, activeKey, onChangeActive, scrollContainerRef }) {
  return (
    <div
      className={`flex overflow-x-auto no-scrollbar gap-2 sm:gap-3 px-3 py-2.5 text-sm items-center font-medium bg-transparent
        lg:overflow-visible lg:flex-col lg:w-[220px] lg:text-base lg:gap-4 lg:text-left lg:items-start lg:pt-4 lg:ps-2 ${
          className ?? ""
        }`}
    >
      {navItems.map((navItem, idx) => (
        <NavItem
          key={navItem.key || navItem.itemName || idx}
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
      className={`flex items-center gap-2 cursor-pointer whitespace-nowrap rounded-full px-3 py-1.5 text-xs sm:text-sm transition-all duration-150 active:scale-95 active:translate-y-[1px]
        ${
          isActive
            ? "bg-coral/10 text-coral font-semibold border border-coral/30"
            : "text-stone-600 bg-stone-100/70 hover:bg-stone-200/70 hover:text-stone-900 border border-stone-200/50"
        }
        ${type == "project" ? "lg:ms-6" : ""}
        lg:rounded-none lg:px-0 lg:py-0 lg:bg-transparent lg:border-none lg:text-base lg:hover:bg-transparent
        ${isActive ? " lg:text-coral lg:font-semibold" : " lg:text-stone-500 lg:hover:text-stone-900"}`}
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

        if (typeof window !== "undefined") {
          if (itemName === "Skills") {
            window.dispatchEvent(new CustomEvent("open-skills-view"));
          } else if (itemName === "Achievements") {
            window.dispatchEvent(new CustomEvent("open-achievements-view"));
          } else if (itemName === "Projects") {
            window.dispatchEvent(new CustomEvent("open-projects-view"));
          } else if (itemName === "Education") {
            window.dispatchEvent(new CustomEvent("open-education-view"));
          } else if (itemName === "Contact") {
            window.dispatchEvent(new CustomEvent("open-contact-view"));
          }
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
