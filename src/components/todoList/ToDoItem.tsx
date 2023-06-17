import { Button, Flex } from '@chakra-ui/react'
import type { TodoItemProps } from 'src/interface/todoList/TodoListType'

const TodoItem = (props: TodoItemProps): JSX.Element => {
    function onClickRemove(): void {
        props.removeItem?.apply(props.removeItem)
    }

    return (
        <Flex p={2}>
            {props.todoItem}
            {
                typeof props.removeItem !== "undefined" ?
                    <Button size={"sm"} colorScheme={"red"} marginLeft={"3"} onClick={onClickRemove}>삭제</Button>
                    : null
            }
        </Flex>
    )
}

export default TodoItem