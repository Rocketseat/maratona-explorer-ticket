import Image from "next/image";

import { Ticket } from "../components/Ticket";

export default function Home() {
  const signInUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_ID}`;

  return (
    <>
      <main className="lg:h-screen max-w-[480px] lg:max-w-[1240px] p-12 mx-auto flex items-center gap-16 flex-col lg:flex-row">
        <div className="max-w-[520px] text-center lg:text-left">
          <Image src="/logo.svg" width={228} height={63} />

          <strong className="text-neutral-200 text-3xl lg:text-4xl leading-tight block mt-12">
            Crie um ticket único e compartilhe com o mundo
          </strong>

          <footer className="mt-10 flex gap-5 flex-col lg:flex-row">
            <a 
              href={signInUrl}
              className="flex justify-center items-center gap-2 text-black px-6 py-4 bg-brand-500 rounded font-bold hover:bg-brand-300"
            >
              <Image src="/icons/github.svg" width={24} height={24} />
              Faça login com GitHub
            </a>
          </footer>
        </div>

        <Ticket className="flex-1 w-full h-auto drop-shadow-ticket" />
      </main>
    </>
  )
}
