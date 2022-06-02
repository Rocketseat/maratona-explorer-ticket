import Image from "next/image";
import * as Dialog from '@radix-ui/react-dialog';

import { Ticket } from "../components/Ticket";

export default function Home() {
  const hasAvatarUploaded = true;

  const signInUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_ID}`;

  return (
    <Dialog.Root>
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
{/* 
            <Dialog.Trigger className="group flex justify-center items-center gap-2 text-brand-500 px-6 py-4 border-brand-500 border rounded font-bold hover:bg-brand-500 hover:text-black">       
              <Image src="/icons/edit.svg" className="group-hover:brightness-0" width={24} height={24} />
              Inserir dados manuais   
            </Dialog.Trigger> */}
          </footer>
        </div>

        <Ticket className="flex-1 w-full h-auto drop-shadow-ticket" />
      </main>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/75" />

        <Dialog.Content className="bg-neutral-800 px-6 md:px-16 py-16 md:py-10 rounded md:max-w-2xl w-full fixed top-0 left-0 right-0 bottom-0 md:bottom-auto md:right-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 text-neutral-200">
          <Dialog.Close className="absolute top-6 right-6 hover:brightness-75">
            <Image src="/icons/close.svg" width={32} height={32} />
          </Dialog.Close>

          <Dialog.Title className="text-2xl font-bold">
            Insira seus dados nos campos abaixo para personalizar seu ticket
          </Dialog.Title>
          
          <form className="mt-10">
            <div className="grid md:grid-cols-2 gap-3 md:gap-6">
              <input 
                type="text" 
                placeholder="Seu nome completo" 
                className="bg-neutral-900 rounded py-4 px-5 focus:outline-0 focus:ring-2 focus:ring-brand-500"
              />
              <input 
                type="text" 
                placeholder="Função ou empresa" 
                className="bg-neutral-900 rounded py-4 px-5 focus:outline-0 focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div className="mt-6 flex items-center gap-3 md:gap-6">
              <input 
                type="file" 
                id="avatar" 
                hidden 
                autoComplete="off" 
                readOnly 
                placeholder="Nenhuma imagem selecionada" 
              />

              <div className="w-16 h-16 md:w-20 md:h-20 bg-neutral-900 rounded-full flex items-center justify-center overflow-hidden">
                { hasAvatarUploaded 
                  ? <img className="w-full h-full object-cover" src="https://github.com/diego3g.png" />
                  : <Image src="/icons/upload-image.svg" width={24} height={24} /> }
              </div>

              <label role="button" aria-controls="avatar" tabIndex={0} htmlFor="avatar" className=" text-black px-4 py-3 bg-brand-500 rounded font-bold hover:bg-brand-300 cursor-pointer">
                <span>Carregar foto</span>
              </label>

              <button className=" text-brand-500 px-4 py-3 border-brand-500 border rounded font-bold hover:bg-brand-500 hover:text-black">
                Apagar
              </button>
            </div>

            <button type="submit" className="mt-6 w-full flex justify-center items-center gap-2 text-black px-6 py-4 bg-brand-500 rounded font-bold hover:bg-brand-300">
              Gerar meu ticket
            </button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
