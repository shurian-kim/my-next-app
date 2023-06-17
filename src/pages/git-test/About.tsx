import { Button, VStack } from "@chakra-ui/react"
import Link from "next/link"
import { useRouter } from "next/router"

const About = (): JSX.Element => {

    const router = useRouter()

    return (
        <>
            <VStack>
                <Link href={"Hello"} style={{
                    margin: '10px'
                }}>돌아가기</Link>
                <Button type="button" style={{
                    display: 'block',
                    margin: '10px'
                }} onClick={() => { router.back() }}>History Back!!</Button>
                <Button type="button" style={
                    {
                        display: 'block',
                        margin: '10px'
                    }
                } onClick={() => { void router.push('Hello'); return false; }}>Router Push!!</Button>
                <Button type="button" style={
                    {
                        display: 'block',
                        margin: '10px'
                    }
                } onClick={() => { void router.replace('Hello'); return false; }}>Router Replace!!</Button>
            </VStack>
        </>
    )
}

export default About