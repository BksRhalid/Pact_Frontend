import { db } from "@/firebase";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

const addTodo = async ({ jobHash, title, description }) => {
  try {
    await addDoc(collection(db, "job"), {
      hash: jobHash,
      title: title,
      description: description,
      createdAt: new Date().getTime(),
    });
  } catch (err) {}
};

export { addTodo };
