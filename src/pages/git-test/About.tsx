import Link from "next/link"
import { useRouter } from "next/router"
import AppLayout from "src/components/layout/AppLayout"

function About() {

    const router = useRouter()

    return (
        <AppLayout>
            <h1>About!!1</h1>
            <h2>About!!2</h2>
            <h3>About!!3</h3>
            <div>
                <Link href={"Hello"} style={{
                    margin: '10px'
                }}>돌아가기</Link>
                <button type="button" style={{
                    display: 'block',
                    margin: '10px'
                }} onClick={() => router.back()}>History Back!!</button>
                <button type="button" style={
                    {
                        display: 'block',
                        margin: '10px'
                    }
                } onClick={()=>router.push('Hello')}>Router Push!!</button>
                <button type="button" style={
                    {
                        display: 'block',
                        margin: '10px'
                    }
                } onClick={()=>router.replace('Hello')}>Router Replace!!</button>
            </div>
        </AppLayout>
    )
}

export default About