import { useContext } from "react"
import { ChallengeContext } from "../contexts/ChallengeContext"
import styles from "../styles/components/CompletedCallenges.module.css"

export function CompletedCallenges() {
  const { challengeCompleted } = useContext(ChallengeContext)

  return (
    <div className={styles.completedChallengesContainer}>
      <span>Desafios Completos</span>
      <span>{challengeCompleted}</span>
    </div>
  )
}