import styles from "./home.module.css"
import Image from "next/image"

const Home = () => {
return (
  <div className={styles.container}>
      <div className={styles.textContainer}>
      <h1 className={styles.title}>
          크래프톤 정글 </h1>
        <h1 className={styles.subTitle}>
        게시판 </h1>
        <p className={styles.desc}>
        </p>
      <div className={styles.buttons}>
        <button className={styles.button}>Learn More</button>
        <button className={styles.button}>Contact</button>
      </div>
        <div className={styles.brands}>
          <Image src="/brands.png" alt="" fill className={styles.brandImg}/>
        </div>
      </div>
      <div className={styles.imgContainer}>
        <Image src="/main.png" alt="" fill className={styles.heroImg}/>
      </div>
  
  </div>

  );
};

export default Home;