import { forwardRef } from "react";
import { Github, Mail, Linkedin } from "lucide-react";

const Contact = forwardRef(function Contact(props, ref) {
  return (
    <section
      ref={ref}
      className=" border border-white/5 scroll-mt-24 flex flex-col sm:flex-row px-5 sm:px-8 py-6 sm:py-8 rounded-4xl justify-center gap-4 sm:gap-6 items-center bg-[radial-gradient(circle_at_top,_rgba(250,250,249,0.12),_transparent_15%),linear-gradient(135deg,_rgba(250,250,249,0.06),_rgba(15,23,42,0.4))] opacity-100 text-center sm:text-left"
    >
      {/* <div
          className="pointer-events-none absolute inset-px rounded-[22px] bg-[radial-gradient(circle_at_top,_rgba(250,250,249,0.12),_transparent_55%),linear-gradient(135deg,_rgba(250,250,249,0.06),_rgba(15,23,42,0.4))] opacity-70"
          aria-hidden="true"
        /> */}

      <h2 className="text-base sm:text-xl font-semibold text-white max-w-xs sm:max-w-none">
        Let&apos;s build something incredible.
      </h2>

      <div className="flex items-center gap-3 sm:gap-4">
        <Link
          href="mailto:mdraihanhossen.cse@gmail.com"
          Icon={Mail}
          label="Email"
        />
        <Link
          href="https://linkedin.com/in/mdraihanhossen"
          Icon={Linkedin}
          label="LinkedIn"
        />
        <Link
          href="https://github.com/mdraihan27"
          Icon={Github}
          label="GitHub"
        />
      </div>
    </section>
  );
});

export default Contact;

function Link({ href, Icon, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-stone-50 transition-all duration-200 hover:border-amber-800/70 hover:bg-amber-400/15 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-800/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:h-12 sm:w-12"
    >
      <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
      <span className="sr-only">{label}</span>
      <span className="pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] text-stone-400 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
        {label}
      </span>
    </a>
  );
}
