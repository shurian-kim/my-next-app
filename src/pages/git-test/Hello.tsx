import { Button, Heading, Input, Flex, VStack } from "@chakra-ui/react"
import { useRouter } from "next/router"
import React, { useState } from "react"

const Hello = (): JSX.Element => {

    const router = useRouter();
    const [cnt, setCnt] = useState<number>(1)

    const increaseCnt = (increaseCnt: number): void => {
        setCnt(cnt + increaseCnt)
    }

    const initCnt = (e: React.MouseEvent<HTMLButtonElement>): void => {
        setCnt(1)
    }
    return (
        <VStack spacing={4} align={"stretch"}>
            <Heading>Hello</Heading>
            <Flex align={"stretch"}>
                <Input type="text" id="cnt" className="inputCss" value={cnt} readOnly width={"500px"} />
                <Button key="btn" size={"sm"} colorScheme={"blue"} marginLeft={"3"} width={"150px"} onClick={event => { increaseCnt(2) }}>카운트 해보자!!</Button>
                <Button key="btnInit" size={"sm"} colorScheme={"red"} marginLeft={"3"} width={"150px"} onClick={initCnt}>초기화!!</Button>
            </Flex>
            <Button onClick={() => { void router.push({ pathname: "./About" }); return false; }}>
                About Go!!
            </Button>
        </VStack>
    )
}

export default Hello