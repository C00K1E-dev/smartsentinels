import styles from '../styles/ComingSoonOverlay.module.css';

export default function ComingSoonOverlay() {
  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        <img src="/ai-agent.png" alt="AI Agent" className={styles.image} />
        <h1 className={styles.text}>
         COMING SOON! AI Agents working on delivering the most rewarding experience.
        </h1>
      </div>
    </div>
  );
}