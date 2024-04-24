import LoginForm from "@/components/loginForm/loginForm";
import { handleGithubLogin } from "@/lib/actions";
import styles from "./login.module.css";
import Link from "next/link";

const LoginPage = () => {
  
  return (
    
    <div className={styles.container}>
      <div className={styles.wrapper}>
  
        <LoginForm />

        <form action={handleGithubLogin}>
            <button className={styles.github}></button>
        </form>

        <Link href="/register">
        {"처음이신가요?"} <b>가입하러가기</b>
      </Link>
      </div>
      
    </div>
  );
};

export default LoginPage;