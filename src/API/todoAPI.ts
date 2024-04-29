import axios from "axios";

const todoAPI = axios.create({
    baseURL: "http://localhost:3500"
})


export const getTodo = async () => {
    const response = await todoAPI.get('/todos')
    return response.data;
}

export const addTodo = async (todo) => {
    return await todoAPI.post("/todos",todo)
}
export const updateTodo = async (todo) => {
    return await todoAPI.patch(`/todos/${todo.id}`,todo)
}
export const deleteTodo = async ({id}) => {
    return await todoAPI.delete(`/todos/${id}`,id)
}

export default todoAPI;