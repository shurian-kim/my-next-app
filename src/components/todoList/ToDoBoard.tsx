import TodoItem from './ToDoItem';
import type { TodoListProps } from 'src/interface/todoList/TodoListType'

const ToDoBoard = (props: TodoListProps): JSX.Element => {

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
                            ? (): void => {
                                if (typeof props.removeItem !== "undefined") {
                                    props.removeItem(index);
                                }
                            }
                            : undefined}
                ></TodoItem>
            })}
        </div >
    )
}

export default ToDoBoard