import { React, useEffect, useState } from "react";
import "./CreateMember.css";
import { supabase } from "../client";

const CreateMember = () => {
  const [newMember, setNewMember] = useState({});
  const [profilePicOptions, setProfilePic] = useState([]);
  const [profilePicChosen, setPicChosen] = useState("");

  const CDNURL =
    "https://rytdskphxetsvafbgjxi.supabase.co/storage/v1/object/public/profile-pic/";

  useEffect(() => {
    const getProfilePic = async () => {
      const { data, error } = await supabase.storage
        .from("profile-pic")
        .list("");
      setProfilePic(data);
    };

    getProfilePic();
  }, []);

  const onValueChange = (event) => {
    const { name, value } = event.target;
    setNewMember((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onChooseImage = (option) => {
    setPicChosen(`${CDNURL}${option.name}`);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    await supabase
      .from("Crew")
      .insert({
        name: newMember.name,
        age: newMember.age,
        ranking: newMember.ranking,
        profilePic: profilePicChosen,
        bio: newMember.bio,
      })
      .select();

    window.location = "/gallery";
  };

  return (
    <div>
      <h1>Add New Krewmate</h1>
      <form className="create-member-container" onSubmit={onSubmit}>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          onChange={onValueChange}
        />
        <input
          type="text"
          id="age"
          name="age"
          placeholder="Age"
          onChange={onValueChange}
        />
        <input
          type="number"
          id="ranking"
          name="ranking"
          placeholder="Ranking"
          onChange={onValueChange}
        ></input>
        <textarea
          name="bio"
          id="bio"
          cols="30"
          rows="5"
          placeholder="Tell us about you"
          onChange={onValueChange}
        ></textarea>
        <br />
        <div className="pic-container">
          <h2>Choose a profile picture</h2>
          <div className="choose-profile-pic">
            {profilePicOptions &&
              profilePicOptions.map((option) => (
                <img
                  id="profile-options"
                  src={`${CDNURL}${option.name}`}
                  onClick={() => {
                    onChooseImage(option);
                  }}
                  tabindex="0"
                />
              ))}
          </div>
        </div>
        <button id="submit-btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateMember;
