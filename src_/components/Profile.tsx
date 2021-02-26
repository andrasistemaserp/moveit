import { useContext } from "react"
import { ChallengeContext } from "../contexts/ChallengeContext";
import styles from "../styles/components/Profile.module.css"

export function Profile() {
  const { level } = useContext(ChallengeContext);

  return (
    <div className={styles.profileContainer}>
      {/* <img src="https://github.com/diego3g.png" alt="Andra Sistemas" /> */}
      {/* <img src="https://www.andrasistemas.com.br/images/logo.jpg" alt="Andra Sistemas" /> */}
      <img src="https://andraerpwebpub.s3.amazonaws.com/danny-profile.jpg" alt="Andra Sistemas" />
      <div>
        <strong>Andra Sistemas</strong>
        <p>
          <img src="icons/level.svg" alt="Level" />
          Level {level}
        </p>
      </div>
    </div>
  )
}