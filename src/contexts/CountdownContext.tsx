import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengeContext } from "./ChallengeContext";

interface CountdownProviderProps {
  children: ReactNode; //o ReactNode aceita qq elemento children, mas aqui no caso é um Component que vem do _app.tsx <Component {...pageProps} />
}

interface CountdownContextData {
  minutes: number;
  seconds: number;
  hasFinished: boolean;
  isActive: boolean;
  startCountDown: () => void;
  resetCountDown: () => void;
}

export const CountdownContext = createContext({} as CountdownContextData);

let countdownTimeout: NodeJS.Timeout;  //pra evitar de pular 1 segundo quando clica no botão para abandonar ciclo

export function CountdownProvider({ children }: CountdownProviderProps) {
  const { startNewChallenge } = useContext(ChallengeContext)

  const initialMinutes = 25; //inicia valor inicial de 25 minutos, se fosse 3 segundos por exemplo seria 0.05
   
  const [time, setTime] = useState(initialMinutes * 60); 
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  //useEffect serve pra toda vez que uma informação mudar executa uma função, também chamado de side effect (efeitos colaterais)
  //quando o segundo parâmetro é vazio [] a função será executada uma única vez assim que este componente for exibido em tela
  useEffect(() => {  //executa qdo o isActive ou o time mudam, que estão no segundo parametro [isActive, time]
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1)
      }, 1000) //1000 = 1 segundo
    } else if (isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
      startNewChallenge();
    }
  }, [isActive, time]);

  function startCountDown() {
    setIsActive(true);
  }

  function resetCountDown() {
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setHasFinished(false);
    setTime(initialMinutes * 60); 
  }

  return (
    <CountdownContext.Provider
      value={{
        minutes,
        seconds,
        hasFinished,
        isActive, 
        startCountDown,
        resetCountDown,
      }}
    >
      { children}
    </CountdownContext.Provider>
  )
}



//extrutura básica de um contexto:
// import { createContext, ReactNode } from "react";

// interface CountdownProviderProps {
//   children: ReactNode; 
// }

// interface CountdownContextData {

// }

// const CountdownContext = createContext({} as CountdownContextData);

// export function CountdownProvider({ children }: CountdownProviderProps) {
//   return (
//     <CountdownContext.Provider value={{}}>
//       { children }
//     </CountdownContext.Provider>
//   )
// }