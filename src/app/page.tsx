import styles from './home.module.scss'
import dynamic from 'next/dynamic'

const ThreeHouse = dynamic(() => import("../components/ThreeHouse"),{
  loading: () => null,
  ssr: false
})

export default function Home() {

  return (
    <div className={styles.home_wrapper}>
      <div className={styles.forward_wrapper}>

        <div className={styles.main_title}>
          <h2>Welcome to</h2>
          <h1>Inspire My Space</h1>
        </div>
      </div>

      <div className={styles.r3f_house} >
        <ThreeHouse />
      </div>
    </div>
  )
}