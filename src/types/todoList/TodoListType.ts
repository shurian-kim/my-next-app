export interface TodoListProps {
    todoList: Array<string>
    removeItem?: (index: number) => void
}

export interface TodoItemProps {
    todoItem: string
    removeItem?: Function
}