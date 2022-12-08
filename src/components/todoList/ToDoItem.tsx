import { DOMAttributes } from 'react'
import type {TodoItemProps} from 'src/types/todoList/TodoListType'

const TodoItem = (props: TodoItemProps) => {
    function onClickRemove() : void{
        props.removeItem?.apply(props.removeItem)
    }

    return (
        <div style={{ marginTop: '10px' }}>
            {props.todoItem}
            {props.removeItem &&
                <button style={{ marginLeft: '10px' }} onClick={onClickRemove}>삭제</button>
            }
        </div>
    )
}

export default TodoItem