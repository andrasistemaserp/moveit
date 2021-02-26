import { useContext } from "react"
import { CountdownContext } from "../contexts/CountdownContext";
import styles from "../styles/components/Countdown.module.css"

export function Countdown() {
  const { 
    minutes, 
    seconds, 
    hasFinished, 
    isActive, 
    startCountDown, 
    resetCountDown 
  } = useContext(CountdownContext);

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')

  return (
    <div>
      <div className={styles.countdownConteiner}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      { hasFinished ? (

        <button
          disabled
          className={styles.countDownButton}
        >
          Ciclo encerrado
        </button>

      ) : (

          //O sinal <> abaixo se chama "fragment" criado pelo react e é como se fosse uma div pra resolver uma "limitação" do React. Esse elemento não será exibido na página
          <>
            { isActive ? (

              <button
                type="button"
                className={`${styles.countDownButton} ${styles.countDownButtonActive}`}
                onClick={resetCountDown}
              >
                Abandonar ciclo
              </button>

            ) : (

                <button
                  type="button"
                  className={styles.countDownButton}
                  onClick={startCountDown}
                >
                  Iniciar ciclo
                </button>

              )}
          </>
        )}
    </div>
  )
}