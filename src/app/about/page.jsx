import styles from "./about.module.css"
import Image from "next/image"

export const metadata = {
    title: 'About JUNGLE',
    description: 'board for namanmoo',
  }

const AboutPage = () => {

    return (
        <div>
            <div className={styles.container}>
                <div className={styles.textContainer}>
                    <h1 className={styles.subtitle}>기능</h1>
                    <h1>
                        게시글 - CRUD
                    </h1>
                    <h1>
                        코멘트 - CRUD : 진행중..
                    </h1>
                    <h1>
                        유저 - Admin 권한 부여
                    </h1>
                    
                    <div className={styles.boxes}>
                        {/* <div className={styles.box}>
                            <h1> 10 K+</h1>
                            <p>Year of experience!</p>
                        </div>
                        <div className={styles.box}>
                            <h1> 10 K+</h1>
                            <p>Year of experience!</p>
                        </div>
                        <div className={styles.box}>
                            <h1> 10 K+</h1>
                            <p>Year of experience!</p>
                        </div> */}
                    </div>
                </div>
                <div className={styles.imgContainer}>
                    <Image
                        src="/about.jpeg"
                        alt="About img"
                        width={600}
                        height={600}
                        className={styles.img}
                    />
                </div>
            </div>
        </div>
    )
}


export default AboutPage