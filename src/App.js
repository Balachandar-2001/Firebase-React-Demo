import './App.css';
import { useState, useEffect } from "react";
import  { db } from './firebase-config';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';


function App() {

  const [users, setUsers] = useState([]);

  const [newUserName, setNewUserName] = useState("");
  const [newAge, setNewAge] = useState(0);
  
  const usersCollectionRef = collection(db, "users");

  const createUser = async () => {
    await addDoc(usersCollectionRef, { name: newUserName, age: Number(newAge) })
  }

  const updateAge = async (id, age) => {
    const doc_updatable = doc(db, "users", id);
    const newage = { age: age + 1 };
    await updateDoc( doc_updatable,newage ); 
  }

  const deleteUser = async (id) => {
    console.log(id);
    const deletable = doc(db,"users",id);
    await deleteDoc(deletable);
  }

  useEffect(() => {

    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map( (doc) => ({ ...doc.data(), id: doc.id }) ))
    }
    getUsers();
  }, []);

  return (
    <div className="App">
      <input placeholder='Username' onChange={ (e) => setNewUserName(e.target.value)  } />
      <input type = "number" placeholder="Password" onChange={ (e) => setNewAge(e.target.value) }/>
      <button onClick={createUser}>Create</button>
      {
        users.map( (docs) => {
          return(
            <div>
              <h2>name: {docs.name}</h2>
              <h2>age: {docs.age}</h2>
              <button onClick={() => updateAge(docs.id, docs.age)} >Update age by 1</button>
              <button onClick={() => deleteUser(docs.id)} >Delete User</button>
            </div>
          );
        } )
      }
    </div>
  );
}

export default App;
