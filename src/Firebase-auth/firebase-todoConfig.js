import { db } from "./firebase-config";

import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    updateDoc,
    doc,
    serverTimestamp,
} from 'firebase/firestore';

const todoRef = collection(db, 'todos');

export const addTodoToFirebase = async (todo) => {
    try {

        const newTodo = {
            ...todo,
            createdAt: serverTimestamp(),
            updateAt: serverTimestamp()
        }
        console.log("new Todo ", newTodo);

        const docRef = await addDoc(todoRef, newTodo);
        return { ...newTodo, id: docRef.id }
    } catch (error) {
        console.error("error:", error)
    }

}

export const fetchTodosFromFirebase = async () => {

    const fetchTodo = await getDocs(todoRef);
    return fetchTodo.docs.map((doc) => ({
        ...doc.data(), id: doc.id
    }))
}


export const deleteTodosFromFirebase = async (id) => {
    await deleteDoc(doc(db, 'todos', id));
}


export const updateTodoInFirebase = async (id, updatedData) => {
    await updateDoc(doc(db, 'todos', id), {
        ...updatedData,
        updatedAt: serverTimestamp(),
    });
};
