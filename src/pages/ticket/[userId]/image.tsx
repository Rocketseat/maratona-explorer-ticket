import { Ticket } from "../../../components/Ticket";
import { GetStaticPaths, GetStaticProps } from "next";
import { getUser } from "../../../lib/database";
import Head from "next/head";

interface TicketImageProps {
  user: {
    id: string;
    name: string;
    roleOrCompany?: string;
    githubUsername?: string;
    avatarUrl: string;
  }
}

export default function TicketImage({ user }: TicketImageProps) {
  return (
    <main className="w-[1200px] h-[630px] bg-neutral-900 grid place-content-center bg-background bg-top bg-[length:auto_100vh] md:bg-cover bg-no-repeat">
      <Head>
        <meta name="robots" content="noindex" />
      </Head>

      <Ticket 
        size="big"
        name={user.name}
        githubUsername={user.githubUsername}
        roleOrCompany={user.roleOrCompany}
        avatarUrl={user.avatarUrl}
        className="drop-shadow-ticket" 
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