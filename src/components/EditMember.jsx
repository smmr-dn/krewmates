import { React, useEffect, useState } from "react";
import "./CreateMember.css";
import { supabase } from "../client";
import { useParams } from "react-router-dom";

const EditMember = () => {
  const params = useParams();
  const [currentMember, setCurrentMember] = useState({});
  const [updateMember, setUpdateMember] = useState({});
  const [profilePicOptions, setProfilePic] = useState([]);
  const [profilePicChosen, setPicChosen] = useState("");

  const CDNURL =
    "https://rytdskphxetsvafbgjxi.supabase.co/storage/v1/object/public/profile-pic/";

  useEffect(() => {
    const getCurrentMember = async () => {
      const { data } = await supabase.from("Crew").select().eq("id", params.id);
      setCurrentMember(data[0]);
      console.log(data);
    };
    getCurrentMember();
  }, [params]);
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
    setUpdateMember((prevState) => ({
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
      .update({
        name: updateMember.name,
        age: updateMember.age,
        ranking: updateMember.ranking,
        profilePic: profilePicChosen,
        bio: updateMember.bio,
      })
      .eq("id", params.id);

    window.location = "/gallery";
  };

  return (
    <div>
      <h1>Update Krewmate</h1>
      <img id="gallery-profile-pic" src={currentMember.profilePic} />
      <form className="create-member-container" onSubmit={onSubmit}>
        <input
          type="text"
          id="name"
          name="name"
          placeholder={currentMember.name}
          onChange={onValueChange}
        />
        <input
          type="text"
          id="age"
          name="age"
          placeholder={currentMember.age}
          onChange={onValueChange}
        />
        <input
          type="number"
          id="ranking"
          name="ranking"
          placeholder={currentMember.ranking}
          onChange={onValueChange}
        ></input>
        <textarea
          name="bio"
          id="bio"
          cols="30"
          rows="10"
          placeholder={currentMember.bio}
          onChange={onValueChange}
        ></textarea>
        <br />
        <div className="pic-container">
          <h2>Choose a new profile picture</h2>
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default EditMember;
