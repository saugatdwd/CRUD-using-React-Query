import { createLazyFileRoute } from '@tanstack/react-router'
import TodoList from '../features/todos/TodoList'

export const Route = createLazyFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      <TodoList/>
    </div>
  )
}