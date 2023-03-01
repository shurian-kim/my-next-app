import { useContext, useState } from "react"
import ToDoBoard from 'src/components/todoList/ToDoBoard';
import { AuthContext } from "modules/auth/AuthComponentProvidor";
import { logger } from '@/utils/logger';

const TodoList = (): JSX.Element => {
    const [inputValue, setInputValue] = useState<string>('')
    const [todoList, setTodoList] = useState<string[]>([])
    const { accessToken } = useContext(AuthContext);

    const addItem = (): void => {
        if (inputValue.trim().length < 1) {
            alert('할일을 입력해 주세요!!!')
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
        setInputValue(e.target.value)
    }

    logger.debug('render todoList = ', todoList)
    return (
        <>
            <input type="text" value={inputValue} onChange={changeInputValue} placeholder="할일을 입력하세요." />
            <button onClick={addItem}>추가</button>
            <ToDoBoard todoList={todoList} removeItem={removeItem}></ToDoBoard>
            accessToken : {accessToken}
        </>
    )
}

export default TodoList