import { db } from "@/firebase";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

const addTodo = async ({ userId, title, description, status }) => {
  try {
    await addDoc(collection(db, "job"), {
      user: userId,
      title: title,
      description: description,
      status: status,
      createdAt: new Date().getTime(),
    });
  } catch (err) {}
};

const toggleTodoStatus = async ({ docId, status }) => {
  try {
    const jobRef = doc(db, "job", docId);
    await updateDoc(jobRef, {
      status,
    });
  } catch (err) {
    console.log(err);
  }
};

const deleteTodo = async (docId) => {
  try {
    const jobRef = doc(db, "job", docId);
    await deleteDoc(jobRef);
  } catch (err) {
    console.log(err);
  }
};

export { addTodo, toggleTodoStatus, deleteTodo };
