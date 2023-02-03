import { Container } from "@chakra-ui/react";
import Auth from "../components/Auth/Auth";
import AddTodo from "../components/AddTodo";
import TodoList from "../components/TodoList";

export default function Home() {
  return (
    <Container maxW="7xl">
      <Auth />
      <AddTodo />
      <TodoList />
    </Container>
  );
}
