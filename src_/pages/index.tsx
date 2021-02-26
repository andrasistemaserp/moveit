import Head from "next/head"
import { GetServerSideProps } from 'next';
import { CompletedCallenges } from "../components/CompetedChallenges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { ChallengeBox } from "../components/ChallengeBox";
import { CountdownProvider } from "../contexts/CountdownContext";
import { ChallengeProvider } from "../contexts/ChallengeContext";

import styles from "../styles/pages/Home.module.css";

interface HomeProps {
  level: number;
  currentExperience: number;
  challengeCompleted : number
}

export default function Home(props: HomeProps) {
  return (
    <ChallengeProvider
      level={props.level}
      currentExperience={props.currentExperience}
      challengeCompleted={props.challengeCompleted}>

      <div className={styles.container}>
        <Head>
          <title>Inicio | move.it</title>
        </Head>

        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedCallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>

    </ChallengeProvider>

  )
}

// obrigatoriamente deve ter este nome (getServerSideProps), pois é utilizado pelo next
// quando getServerSideProps é declarada em uma página next é possível maniplar o que é passado da camada intermediária (Next.js) para o front-end (React.js)
// não é feito na "Home" porque os mecanismos de busca não aguardam uma chamada ao banco por exemplo
// portanto a Home consece acessar as props do getServerSideProps
// tudo feito na getServerSideProps é executado dentro do servidor node e não do browser do usuário (Home)
// o next surgiu a partir desta função (getServerSideProps) que antes chamava getInicialProps, porém hoje dá pra fazer muito mais coisas no next
// SEO (Seach Engine Optimization), fazer com que motores de busca consigam ler o conteúdo da aplicação
// esses mecanismos de busca funcionam com o javascript desabilitado

// as apps criadas pelo em react-app não são visualizados pelos mecanismos de pesquisa
// pra testar basta desativar o javascript do browser que o app não vai funcionar
// o next vem para solucionar este problema
// pra desativar o javascript vá em inspecionar elemento e no canto superior direito vá em settings (configurações) e no advanced settings (ou debbuger) é que desabilita
// fazendo isso no andra web vai aparecer a msg do index.html "You need to enable JavaScript to run this app."

// Back-end (Ruby, Node.js, etc)
// Next.js (Node.js) - camada intermediária, não é recomendado fazer acesso ao banco de dados, envio de e-mails, acesso a serviços externos
//                     podendo ser feito em alguns momentos, tendo vídeos no canal da Rocketseat explicando isso pelo Diego  
// Front-end (React.js)

export const getServerSideProps: GetServerSideProps = async (ctx) => { //deve ser async pela tipagem do next

  const { level, currentExperience, challengeCompleted } = ctx.req.cookies;

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengeCompleted: Number(challengeCompleted)
    }
  }
}

