import { createContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';
import challenges from '../../challenges.json'
import { LevelUpModal } from '../components/LeveUpModal';

interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface ChallengeProviderProps {
  children: ReactNode; //o ReactNode aceita qq elemento children, mas aqui no caso é um Component que vem do _app.tsx <Component {...pageProps} />
  //as 3 variáveis abaixo são originárias do index.tsx HomeProps
  level: number;
  currentExperience: number;
  challengeCompleted: number
}

interface ChallengeContextData {  //utilizando o typescript pra criar este tipagem serve pra tornar o app mais inteligente, onde possa sugerir ou aparecer de forma automática o retorno do ChallengeContext
  level: number;
  currentExperience: number;
  challengeCompleted: number;
  activeChallenge: Challenge;
  experienceToNextLevel: number;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
  closeLevelUpModal: () => void;
}

export const ChallengeContext = createContext({} as ChallengeContextData);

export function ChallengeProvider({
  children,
  ...rest  //incluido rest pra pegar as 3 variáveis restantes (level, currentExperience, challengeCompleted), pois se forem incluídas vai entrar em conflito com as variaveis abaixo com o mesmo nome
}: ChallengeProviderProps) {  //o children vem do _app.tsx que é <Component {...pageProps} />
  const [level, setLevel] = useState(rest.level ?? 1);  //se rest.leve não existir obtem o 1
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
  const [challengeCompleted, setChallengeCompleted] = useState(rest.challengeCompleted ?? 0);
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

  //useEffect pede a permissão ao browser para enviar notificações para o usuário
  //quando o segundo parâmetro é vazio [] a função será executada uma única vez assim que este componente for exibido em tela
  useEffect(() => {
    Notification.requestPermission(); //Notification é a API do próprio browser
  }, [])

  // Utilizar cookies ao invés do localstorage é que o Next não é só javascript no navegador, pois o Next tem a camada intermediária entre o backend e frontend, que é um servidor Node,
  // fica responsável por construir a interface. Servidor Node não tem acesso ao localstorage, pois o localstorage é algo específico do browser. Salvando em cookies todas as camadas da app,
  // como backend, frontend e camada intermediária (Next), vão ter acesso ao as informações do cookie. Utilizando next tem que usar cookies. Para instalar:
  // yarn add js-cookie
  // yarn add @types/js-cookie -D

  //gravar nos cookies
  useEffect(() => {
    Cookies.set('level', String(level));
    Cookies.set('currentExperience', String(currentExperience));
    Cookies.set('challengeCompleted', String(challengeCompleted));
  }, [level, currentExperience, challengeCompleted]);  //qdo alguma desses parâmetros mudar executa o useEffect, são as informações que serão gravadas nos cookies

  function levelUp() {
    setLevel(level + 1);
    //criar o modal pode ser feito do zero colocando ele em tema, pode ser utilizada alguma biblioteca, ou seja, pode ser feito de diversas forma, não existe forma correta
    //aqui vai ser criada com um componente react
    setIsLevelUpModalOpen(true);
  }

  function closeLevelUpModal() {
    setIsLevelUpModalOpen(false);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[randomChallengeIndex]

    setActiveChallenge(challenge);

    new Audio('/notification.mp3').play(); //como está na pasta public não necessita passar nenhum caminho, onde o "/" pega no root

    if (Notification.permission === 'granted') {
      new Notification('Novo desafio 🎉', {
        body: `Valendo ${challenge.amount} xp!`
      })
    }
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function completeChallenge() {
    if (!activeChallenge) {
      return;
    }

    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }

    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengeCompleted(challengeCompleted + 1);

  }

  return (
    <ChallengeContext.Provider
      //aqui não necessariamente deve ter a mesma ordem de ChallengeContextData
      value={{
        level,
        currentExperience,
        challengeCompleted,
        activeChallenge,
        experienceToNextLevel,
        levelUp,
        startNewChallenge,
        resetChallenge,
        completeChallenge,
        closeLevelUpModal,
      }}
    >
      { children }

      { isLevelUpModalOpen && <LevelUpModal />}
    </ChallengeContext.Provider>

  )
}