import TodoItem from './ToDoItem';
import type {TodoListProps} from 'src/types/todoList/TodoListType'

const ToDoBoard = (props: TodoListProps) => {

    return (
        <div>
            <h1>To Do Board</h1>
            {props.todoList.map((element: string, index: number) => {
                // console.log('ToDoBoard props.removeItem typeof : ', typeof (props.removeItem) === 'function')
                return <TodoItem
                    key={`${element}${index}`}
                    todoItem={element}
                    removeItem={
                        typeof (props.removeItem) === 'function'
                            ? () => props.removeItem ? props.removeItem(index) : null
                            : undefined}
                ></TodoItem>
            })}
        </div>
    )
}

export default ToDoBoard