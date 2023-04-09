import { supabase } from "../client";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Gallery = () => {
  const [allMembers, setAllMembers] = useState(null);

  useEffect(() => {
    fetchPosts();
  });

  const fetchPosts = async () => {
    const { data } = await supabase.from("Crew").select();

    // set state of posts
    setAllMembers(data);
  };

  return (
    <div className="gallery-container">
      <h1>Gallery</h1>

      <div className="member-container">
        {allMembers &&
          allMembers.map((member) => (
            <Link to={`/gallery/${member.id}`}>
              <div className="member-card">
                <h3>{member.name}</h3>
                <img id="gallery-profile-pic" src={member.profilePic} />
                <p>Age: {member.age}</p>
                <p>Ranking: {member.ranking}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};
export default Gallery;
