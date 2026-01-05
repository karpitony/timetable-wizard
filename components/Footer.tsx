import { LuGithub } from 'react-icons/lu';
import { SiLinkedin, SiVelog } from 'react-icons/si';
import { IoHomeSharp } from 'react-icons/io5';
import Link from 'next/link';

const LINKS = [
  {
    href: 'https://github.com/karpitony',
    icon: <LuGithub size={24} />,
    label: 'GitHub',
  },
  {
    href: 'https://www.linkedin.com/in/yunseok-song',
    icon: <SiLinkedin size={24} />,
    label: 'LinkedIn',
  },
  {
    href: 'https://velog.io/@karpitony/posts',
    icon: <SiVelog size={24} />,
    label: 'Velog',
  },
  {
    href: 'https://yunseok.vercel.app',
    icon: <IoHomeSharp size={24} />,
    label: 'Personal Site',
  },
];

export default function Footer() {
  return (
    <footer className="bg-slate-800 text-center py-18 text-gray-200 mt-10">
      <Link
        href="https://github.com/karpitony/timetable-wizard"
        className="flex items-center justify-center gap-2 mb-4 text-gray-300 hover:text-white transition-colors"
      >
        <LuGithub size={24} />
        <span className="text-lg font-semibold">소스코드</span>
      </Link>
      <p className="text-sm mt-8">Made by Yunseok Song</p>
      <p className="text-xs mt-2">
        본 서비스에서 제공하는 강의 시간표 및 경쟁률 정보의 원본 데이터는 동국대학교가 소유하고
        있습니다.
      </p>
      <p className="text-xs">
        본 사이트는 동국대학교의 공식 서비스가 아니며, 수익을 창출하지 않는 학생 개인
        프로젝트입니다.
      </p>
      <p className="text-xs">
        제공되는 정보는 참고용이며, 정확한 내용은 학교 공식 시스템을 기준으로 합니다.
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
            <span className="absolute -right-1.5 -bottom-1.5 w-2.5 h-2.5 bg-green-400 rounded-full ring-2 ring-gray-900" />
          </Link>
        ))}
      </div>
    </footer>
  );
}
