import Logo from '@public/icons/logo-main.svg'
import Image from 'next/image'

export default function LoginPage() {
  return (
    <div className="flex items-center justify-end h-full gap-4">
      <div className="font-[family-name:var(--font-geist-sans)] text-white w-full flex justify-center flex-col px-12">
        <div className="title flex items-center gap-2 justify-items-left ">
          <Logo />
          <h1 className="text-2xl font-bold">finance.ai</h1>
        </div>
        <div className="content w-full">
          <h2 className="text-4xl font-bold mt-8">Bem vindo!</h2>
          <p className="text-base mt-3 pr-5">
            A Finance AI é uma plataforma de gestão financeira que utiliza IA para monitorar suas
            movimentações, e oferecer insights personalizados, facilitando o controle do seu
            orçamento.
          </p>
          <button className="mt-8 w-full bg-slate-500 border-white border-solid border-2 rounded">
            Entrar com Google
          </button>
        </div>
      </div>
      <Image src="/images/bg-login.png" alt="Login" width={600} height={600} objectFit="cover" />
    </div>
  )
}
