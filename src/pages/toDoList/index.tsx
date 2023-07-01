import { KeyboardEvent, useContext, useRef, useState } from "react"
import ToDoBoard from 'src/components/todoList/ToDoBoard';
import { AuthContext } from "modules/auth/AuthComponentProvidor";
import { Input, InputGroup, InputRightAddon, Stack, VStack, Text, useToast, Alert, AlertIcon, Box, CloseButton, AlertTitle, AlertDescription } from '@chakra-ui/react'
import { logger } from '@/utils/logger';

const TodoList = (): JSX.Element => {
    const [inputValue, setInputValue] = useState<string>('')
    const [todoList, setTodoList] = useState<string[]>([])
    const { accessToken } = useContext(AuthContext);
    // const toast = useToast();
    const [todoErrorFlag, setTodoErrorFlag] = useState<boolean>(false);
    const iptRef = useRef<HTMLInputElement>(null);
    const addIemRef = useRef<HTMLDivElement>(null);

    const addItem = (): void => {
        if (inputValue.trim().length < 1) {
            setTodoErrorFlag(true);
            // toast({
            //     title: `할일을 입력해 주세요!!!`,
            //     status: 'error',
            //     position: 'top',
            //     isClosable: true,
            // })
            return;
        }
        setTodoList([...todoList, inputValue])
    }
    const removeItem = (index: number): void => {
        setTodoList(() => {
            const todoListClole = [...todoList]
            todoListClole.splice(index, 1)
            return todoListClole
        })
    }
    const changeInputValue = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if ((e.target.value ?? "").length > 0) {
            setTodoErrorFlag(false);
        }
        setInputValue(e.target.value);
    }
    const keyDownInputEvent = (e: KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === "Enter") {
            e.preventDefault();
            addIemRef.current?.click();
        }
    }

    logger.debug('render todoList = ', todoList)
    return (
        <>
            <VStack spacing={4} align={"stretch"}>
                <InputGroup size='sm' width={"500px"}>
                    <Input type="text" ref={iptRef} value={inputValue} onChange={changeInputValue} onKeyDown={keyDownInputEvent} onClick={() => { setTodoErrorFlag(false); }} placeholder="할일을 입력하세요." />
                    <InputRightAddon onClick={() => { setInputValue("") }} marginRight={3} cursor={"pointer"} title="삭제">X</InputRightAddon>
                    <InputRightAddon ref={addIemRef} onClick={addItem} bgColor={"blue.500"} color={"white"} cursor={"pointer"}>추가</InputRightAddon>
                </InputGroup>
                {todoErrorFlag && (
                    <Alert status='error' width={"500px"}>
                        <AlertIcon />
                        <Box width={"500px"}>
                            <AlertTitle>Error!</AlertTitle>
                            <AlertDescription role="alert">
                                할일을 입력해 주세요!
                            </AlertDescription>
                        </Box>
                        <CloseButton
                            title="오류창 닫기"
                            alignSelf='flex-start'
                            position='relative'
                            right={-1}
                            top={-1}
                            onClick={() => { setTodoErrorFlag(false); iptRef.current?.focus() }}
                        />
                    </Alert>
                )}
                <ToDoBoard todoList={todoList} removeItem={removeItem}></ToDoBoard>
            </VStack >

            <Stack spacing={10} marginTop={10}>
                <Text fontSize={"lg"}>accessToken : {accessToken}</Text>
            </Stack>

        </>
    )
}

export default TodoList