import React from "react";
import "./CreateMember.css";
import { supabase } from "../client";

const CreateMember = () => {
  let [newMember, setNewMember] = useState({});

  const onValueChange = (event) => {
    const { name, value } = event.target;
    setNewMember((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    await supabase
      .from("Posts")
      .insert({
        title: post.title,
        author: post.author,
        description: post.description,
      })
      .select();

    window.location = "/";
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label for="title">Name</label> <br />
        <input type="text" id="name" name="name" onChange={onValueChange} />
        <br />
        <br />
        <label for="author">Age</label>
        <br />
        <input type="text" id="age" name="age" onChange={onValueChange} />
        <br />
        <br />
        <label for="description">Ranking</label>
        <br />
        <input
          type="number"
          id="ranking"
          name="ranking"
          onChange={onValueChange}
        ></input>
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default CreateMember;
