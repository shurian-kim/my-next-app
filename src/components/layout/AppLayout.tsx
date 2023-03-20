import Link from 'next/link';
import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import hMenuStyle from 'src/styles/Header.module.css'
import { ReactNode, useContext, useEffect, useState } from 'react';
import { AuthContext, IAuthContext } from "modules/auth/AuthComponentProvidor";
// import classNames from 'classnames';
// import sMenuStyle from '@/styles/Sidebar.module.css'
// import PropTypes from 'prop-types'

const AppLayout = ({ children }: { children: ReactNode }): JSX.Element => {

    const { accessToken } = useContext<IAuthContext>(AuthContext);

    const [isLogin, setIsLogin] = useState<boolean>(false);

    useEffect(() => {
        setIsLogin((sessionStorage.getItem(process.env.NEXT_PUBLIC_ACCESS_TOKEN ?? "") ?? "").length > 0);
    }, [accessToken])

    // useEffect(() => {}, [])
    return (
        <div className={styles.container}>
            <Head>
                <title>My next app</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <header>
                <section className={hMenuStyle.hbody}>
                    <nav className={hMenuStyle.nav}>
                        <div className={hMenuStyle.title}><Link href="/">DJK</Link></div>
                        <ul className={hMenuStyle.menu}>
                            <li><Link href="/">home</Link></li>
                            <li><Link href="/git-test/Hello">Hello</Link></li>
                            <li><Link href="/jquery">jQuery</Link></li>
                            <li><Link href="/kakao">kakao</Link></li>
                            <li><Link href="/toDoList">todoList</Link></li>
                            <li>{isLogin
                                ? (
                                    <Link href="/logout">Logout</Link>
                                )
                                : (
                                    <Link href="/login/loginProcess">Login</Link>
                                )
                            }</li>
                        </ul>
                        <i className={[hMenuStyle.fab, hMenuStyle.fa_twitter_squar].join(' ')}></i>
                        <i className={[hMenuStyle.fas, hMenuStyle.fa_bars].join(' ')}></i>
                    </nav>
                </section>
            </header>
            <main style={{ padding: '70px 50px' }}>{children}</main>
            <footer className="footer">
            </footer>
        </div>
    )
}

export default AppLayout