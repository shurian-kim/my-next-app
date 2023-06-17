import { Heading, VStack } from '@chakra-ui/react';
import TodoItem from './ToDoItem';
import type { TodoListProps } from 'src/interface/todoList/TodoListType'

const ToDoBoard = (props: TodoListProps): JSX.Element => {

    return (
        <VStack align={"stretch"} marginTop={"2em"}>
            <Heading>To Do Board</Heading>
            {props.todoList.map((element: string, index: number) => {
                // logger.debug('ToDoBoard props.removeItem typeof : ', typeof (props.removeItem) === 'function')
                return <TodoItem
                    key={`${element}${index}`}
                    todoItem={element}
                    removeItem={
                        typeof (props.removeItem) === 'function'
                            ? (): void => {
                                if (typeof props.removeItem !== "undefined") {
                                    props.removeItem(index);
                                }
                            }
                            : undefined}
                ></TodoItem>
            })}
        </VStack >
    )
}

export default ToDoBoard