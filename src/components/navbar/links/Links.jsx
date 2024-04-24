"use client";
import Link from "next/link"
import styles from "./links.module.css"
import NavLink from "./navLink/NavLink";
import {useState} from 'react';
import Image from 'next/image'
import {hanleLogout} from '../../../lib/actions'


const Links = ({session}) => {
    const [open,setOpen] = useState(false);

    const links = [
        {
            title: "Homepage",
            path: "/",
        },
        {
            title: "About",
            path: "/about",
        },
        {
            title: "Contact",
            path: "/contact",
        },
        {
            title: "Blog",
            path: "/blog",
        },
        
    ]


    return (
        <>
        <div  className={styles.links}>
            {links.map((link=>(
                <NavLink item={link} key={link.title} />
            )))}{
                session?.user ? (
                    <>
                    {
                        session.user?.isAdmin && (
                            <NavLink item={{title: "Admin", path:"/admin"}}/>
                        )
                    }
                    <form action={hanleLogout}>
                        <button className={styles.logout}>Logout</button>
                    </form>
                    </>
                ) : (
                    <NavLink item={{title: "Login", path:"/login"}}/>
                )
            }
        </div>
        <Image
        className={styles.menuButton}
        src="/menu.png"
        alt=""
        width={30}
        height={30}
        onClick={() => setOpen((prev) => !prev)}
        />
        {
            open && <div className={styles.mobileLinks}>
            {links.map((link) => (
                <NavLink item={link} key={link.title}/>
            ))}
            </div>
        }
        </>
    );
};

export default Links