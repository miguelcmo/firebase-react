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
      await addDoc(projectsCollectionsRef, {
        name: name,
        owner: owner,
        delivery: delivery,
      });
    } catch (err) {
      console.error(err);
    }
  };

  // verificar 51:58
  return (
    <>
      <h1 className="text-xl">Create new project:</h1>

      <form
        action="#"
        method="POST"
        onSubmit={(e) => e.preventDefault()}
        className="mx-auto mt-6 max-w-xxl lg:mt-6"
      >
        <div className="grid grid-cols-3 gap-x-8 gap-y-6 sm:grid-cols-3">
          <div>
            <label
              htmlFor="first-name"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Project name
            </label>
            <div className="mt-2.5">
              <input
                id="first-name"
                name="first-name"
                type="text"
                placeholder="Project name..."
                onChange={(e) => setName(e.target.value)}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="first-name"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Project owner
            </label>
            <div className="mt-2.5">
              <input
                id="first-name"
                name="first-name"
                type="text"
                placeholder="Owner..."
                onChange={(e) => setOwner(e.target.value)}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="first-name"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Delivery month
            </label>
            <div className="mt-2.5">
              <input
                id="first-name"
                name="first-name"
                type="text"
                placeholder="delivery..."
                onChange={(e) => setDelivery(e.target.value)}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
        <div className="mt-10">
          <button
            type="submit"
            onClick={onSaveProject}
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save project
          </button>
        </div>
      </form>

      <h1 className="text-xl">List of projects:</h1>

      <div class="flex flex-col">
        <div class="-m-1.5 overflow-x-auto">
          <div class="p-1.5 min-w-full inline-block align-middle">
            <div class="overflow-hidden">
              <table class="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                    >
                      Project Name
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                    >
                      Owner
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                    >
                      Delivery
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 dark:divide-neutral-700">
                  {projects.map((project, index) => (
                    <tr key={index}  class="hover:bg-gray-100 dark:hover:bg-neutral-700">
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">{project.name}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">{project.owner}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">{project.delivery}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
