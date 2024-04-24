import Links from "./links/Links"
import styles from './navbar.module.css'
import Link from "next/link"
import { auth }  from "@/lib/auth"
import { render } from "react-dom";
import FetchData from './fetchData'


const Navbar = async () => {
    
    const session = await auth();
    console.log("navbar..");
    console.log(session);
    return (
        <div className={styles.container}>
            
            <Link href="/" className={styles.logo}>KRAFTON JUNGLE</Link>
            <></>
            <div>
                <FetchData />
                <Links session={session}/>
            </div>
        </div>
    )
}

export default Navbar 