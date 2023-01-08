export interface TodoListProps {
    todoList: string[]
    removeItem?: (index: number) => void
}

export interface TodoItemProps {
    todoItem: string
    removeItem?: () => void
}