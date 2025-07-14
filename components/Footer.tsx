import { LuGithub } from "react-icons/lu";
import { SiLinkedin, SiVelog } from "react-icons/si";
import { IoHomeSharp } from "react-icons/io5";
import Link from "next/link";

const LINKS = [
  {
    href: "https://github.com/karpitony",
    icon: <LuGithub size={24} />,
    label: "GitHub",
  },
  {
    href: "https://www.linkedin.com/in/yunseok-song",
    icon: <SiLinkedin size={24} />,
    label: "LinkedIn",
  },
  {
    href: "https://velog.io/@karpitony/posts",
    icon: <SiVelog size={24} />,
    label: "Velog",
  },
  {
    href: "https://yunseok.vercel.app",
    icon: <IoHomeSharp size={24} />,
    label: "Personal Site",
  },
];

export default function Footer() {
  return (
    <footer className="bg-slate-800 text-center py-20 text-gray-200 mt-10">
      <Link
        href="https://github.com/karpitony/timetable-wizard"
        className="flex items-center justify-center gap-2 mb-4 text-gray-300 hover:text-white transition-colors"
      >
        <LuGithub size={24} />
        <span className="text-lg font-semibold">소스코드</span>
      </Link>
      <p className="text-sm mt-4">
        Made by Yunseok Song
      </p>
      <div className="flex items-center mt-4 justify-center gap-6">
        {LINKS.map(link => (
          <Link
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex text-gray-300 hover:text-white transition-colors"
            aria-label={link.label}
          >
            {link.icon}
            <span className="absolute -right-1.5 -bottom-1.5 w-2.5 h-2.5 bg-green-400 rounded-full ring-2 ring-gray-900 animate-pulse" />
          </Link>
        ))}
      </div>
    </footer>
  );
}