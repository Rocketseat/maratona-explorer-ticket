import Image from "next/image";

import { Ticket } from "../../../components/Ticket";
import { GetStaticPaths, GetStaticProps } from "next";
import { getUser } from "../../../lib/database";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";

interface TicketPageProps {
  user: {
    id: string;
    name: string;
    roleOrCompany?: string;
    githubUsername?: string;
    avatarUrl: string;
  }
}

export default function TicketPage({ user }: TicketPageProps) {
  const router = useRouter()
  const [hasTicketLinkBeenCopied, setHasTicketLinkBeenCopied] = useState(false)

  const userId = String(router.query.userId)

  const shareUrl = `${process.env.NEXT_PUBLIC_APP_URL}/ticket/${userId}/share`
  const shareMessage = encodeURIComponent(`Fala, dev! Estou participando da Maratona Explorer, um evento online e gratuito de programação da Rocketseat, onde vamos construir juntos uma aplicação completa de 06 a 12 de junho e acelerar na carreira.\n\nJunte-se a mim pelo link: ${shareUrl}`);
  const twitterShareMessage = encodeURIComponent(`Fala, dev! Estou participando da Maratona Explorer, um evento online e gratuito de programação da Rocketseat, onde vamos construir juntos uma aplicação completa de 06 a 12 de junho e acelerar na carreira.\n\nJunte-se a mim!`);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_APP_URL}/ticket.png?userId=${userId}`);
  }, [userId])

  async function handleCopyTicketLink() {
    await navigator.clipboard.writeText(shareUrl);
    setHasTicketLinkBeenCopied(true);

    setTimeout(() => {
      setHasTicketLinkBeenCopied(false);
    }, 2000)
  }

  return (
    <main className="lg:h-screen max-w-[480px] lg:max-w-[1240px] p-12 mx-auto flex items-center gap-24 flex-col lg:flex-row">
      <Head>
        <title>Ticket Gerado | Maratona Explorer</title>

        <meta name="robots" content="noindex" />
      </Head>

      <div className="max-w-[520px] text-center lg:text-left">
        <Image src="/logo.svg" width={228} height={63} />

        <strong className="text-neutral-200 text-xl mt-12 inline-flex lg:flex gap-4">
          <img src="/icons/check.svg" />
          <span>Ticket criado <span className="text-green-500">com sucesso</span></span>
        </strong>

        <strong className="text-neutral-200 text-4xl mt-4 block">Agora mostre ao mundo</strong>

        <footer className="mt-6 grid grid-cols-4 gap-6">
          <a 
            href={`https://wa.me/?text=${shareMessage}`}
            className="h-[60px] bg-brand-500 rounded hover:bg-brand-300 flex items-center justify-center">
            <img src="/icons/whatsapp.svg" alt="Compartilhar no WhatsApp" />
          </a>

          <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`} className="h-[60px] bg-brand-500 rounded hover:bg-brand-300 flex items-center justify-center">
            <img src="/icons/linkedin.svg" alt="Compartilhar no LinkedIn" />
          </a>

          <a href={`http://twitter.com/share?text=${twitterShareMessage}&url=${shareUrl}`} className="h-[60px] bg-brand-500 rounded hover:bg-brand-300 flex items-center justify-center">
            <img src="/icons/twitter.svg" alt="Compartilhar no Twitter" />
          </a>

          <a href={`http://www.facebook.com/sharer/sharer.php?u=${shareUrl}&t=${twitterShareMessage}`} className="h-[60px] bg-brand-500 rounded hover:bg-brand-300 flex items-center justify-center">
            <img src="/icons/facebook.svg" alt="Compartilhar no Facebook" />
          </a>
        </footer>

        <button 
          onClick={handleCopyTicketLink} 
          disabled={hasTicketLinkBeenCopied}
          className="mt-8 w-full group flex justify-center items-center gap-2 text-brand-500 px-6 py-4 border-brand-500 border rounded font-bold hover:bg-brand-500 hover:text-black disabled:hover:bg-transparent disabled:hover:text-brand-500"
        >       
          { hasTicketLinkBeenCopied ? (
            <>
              <img src="/icons/check-2.svg" alt="" />
              Copiado
            </>
          ) : (
            <>
              <img src="/icons/copy.svg" className="group-hover:brightness-0" alt="" />
              Copiar link do convite
            </>
          ) }
        </button>
      </div>

      <Ticket 
        name={user.name}
        githubUsername={user.githubUsername}
        roleOrCompany={user.roleOrCompany}
        avatarUrl={user.avatarUrl}
        className="flex-1 w-full h-auto drop-shadow-ticket" 
      />
    </main>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const user = await getUser(String(params.userId))

  return {
    props: {
      user,
    },
    revalidate: 60 * 60 * 24, // 1 day
  }
}