import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getTodo, addTodo, updateTodo, deleteTodo } from "../../API/todoAPI";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import { Autocomplete, InputAdornment } from "@mui/material";

const TodoList = () => {
  const [newTodo, setNewTodo] = useState<any>()
  const queryClient = useQueryClient();

  const {
    isLoading,
    isError,
    error,
    data: todo,
  } = useQuery("todo", getTodo, {
    select: (data) => data.sort((a: number, b: number) => b - a),
  });

  const addTodoMutation = useMutation(addTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todo");
    },
  });
  const updateTodoMutation = useMutation(updateTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todo");
    },
  });
  const deleteTodoMutation = useMutation(deleteTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todo");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTodoMutation.mutate({ title: newTodo });
  };

  const AddButton = () => (
    <IconButton aria-label="add" type="submit">
      <AddIcon color="primary" />
    </IconButton>
  );

  const onSelect = (e:React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    todoLists.forEach((el) => {
      if (el.text === value) {
        setNewTodo(el);
      }
    });
  };

  const todoLists = [
    { text: "Wake Up", value: 1 },
    { text: "Drink", value: 2 },
    { text: "Eat", value: 3 },
    { text: "Play", value: 4 },
    { text: "Sleep", value: 5 },
  ];

  const newItemSection = (
    <form onSubmit={handleSubmit}>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        sx={{ width: 300 }}
        value={newTodo}
        options={todoLists}
        isOptionEqualToValue={(Option) => Option.value === newTodo}
        getOptionLabel={(option) => option.text}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Todo"
            onSelect={onSelect}
            placeholder="Enter new todos"
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <AddButton />
                </InputAdornment>
              ),

              endAdornment: <></>,
            }}
          />
        )}
      />
    </form>
  );

  let content;
  if (isError) {
    content = <div>Error: {(error as Error).message}</div>;
  } else if (isLoading) {
    content = <div>Loading...</div>;
  } else {
    content = todo.map((todo) => (
      <table
        key={todo.id}
        style={{ minWidth: "235px", width: "100%", border: "1px solid black" }}
      >
        <tbody>
          <tr>
            <td
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  id={todo.id}
                  onChange={() => {
                    updateTodoMutation.mutate({
                      ...todo,
                      completed: !todo.completed,
                    });
                  }}
                />
                <label htmlFor={todo?.id}>{todo?.title?.text}</label>
              </div>
              <IconButton
                aria-label="delete"
                onClick={() => {
                  deleteTodoMutation.mutate({ id: todo.id });
                }}
              >
                <DeleteIcon sx={{ color: "secondary.dark" }} />
              </IconButton>
            </td>
          </tr>
        </tbody>
      </table>
    ));
  }

  return (
    <>
      <div style={{ display: "grid", justifyContent: "center" }}>
        <h1 style={{ display: "flex", justifyContent: "center" }}>
          Todos List
        </h1>
        {newItemSection}
        {content}
      </div>
    </>
  );
};

export default TodoList;

