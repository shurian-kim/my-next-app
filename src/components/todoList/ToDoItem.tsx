import type { TodoItemProps } from 'src/interface/todoList/TodoListType'

const TodoItem = (props: TodoItemProps): JSX.Element => {
    function onClickRemove(): void {
        props.removeItem?.apply(props.removeItem)
    }

    return (
        <div style={{ marginTop: '10px' }}>
            {props.todoItem}
            {
                typeof props.removeItem !== "undefined" ?
                    <button style={{ marginLeft: '10px' }} onClick={onClickRemove}>삭제</button>
                    : null
            }
        </div>
    )
}

export default TodoItem