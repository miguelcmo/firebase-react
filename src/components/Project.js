import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig.js";
import { getDocs, collection, addDoc } from "firebase/firestore";

export default function Project() {
  const [projects, setProjects] = useState([]);

  //new project states
  const [name, setName] = useState("");
  const [owner, setOwner] = useState("");
  const [delivery, setDelivery] = useState("");

  const projectsCollectionsRef = collection(db, "projects");

  useEffect(() => {
    const getProjects = async () => {
      try {
        const data = await getDocs(projectsCollectionsRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setProjects(filteredData);
      } catch (err) {
        console.error(err);
      }
    };

    getProjects();
  }, []);

  const onSaveProject = async () => {
    try {
        await addDoc(projectsCollectionsRef, {name: name, owner: owner, delivery: delivery});
    } catch (err) {
        console.error(err);
    }
  };

    // verificar 51:58
    return (
        <>
        <div>
            <input placeholder="Project name..." onChange={e => setName(e.target.value)}/>
            <input placeholder="Owner..." onChange={e => setOwner(e.target.value)}/>
            <input placeholder="delivery..." onChange={e => setDelivery(e.target.value)}/>
            <button onClick={onSaveProject}>Save Project</button>
        </div>

            {projects.map((project, index) => (
                <div key={index}>
                    <h1>Project name: {project.name}</h1>
                    <p>Owner: {project.owner}</p>
                    <p>Delivery: {project.delivery}</p>
                </div>
            ))}
        </>
    );
}
