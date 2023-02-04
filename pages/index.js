import Head from "next/head";
import { Container, Flex } from "@chakra-ui/react";
import Auth from "../components/Auth/Auth";
import AddTodo from "../components/Gigs/AddTodo";
import TodoList from "../components/Gigs/TodoList";
import Layout from "../components/Layout";
import Sidebar from "../components/Sidebar/Sidebar";

export default function Home() {
  return (
    <>
      <Head>
        <title>
          Trouver un job freelance sécurisé par la blockchain | Pact
        </title>
        <meta name="description" content="freelance job backed by blockchain" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Sidebar />
    </>
  );
}
