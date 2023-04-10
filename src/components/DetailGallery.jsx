import { useParams } from "react-router-dom";
import { supabase } from "../client";
import { useState, useEffect } from "react";
import "./DetailGallery.css";
import { Link } from "react-router-dom";

const DetailGallery = () => {
  const params = useParams();
  const [memberInfo, setMemberInfo] = useState(null);

  useEffect(() => {
    getById();
  }, []);

  const getById = async () => {
    const { data, error } = await supabase
      .from("Crew")
      .select()
      .eq("id", params.id);

    setMemberInfo(data[0]);
  };

  const onDeleteMember = async () => {
    await supabase.from("Crew").delete().eq("id", params.id);
    window.location = "/gallery";
  };

  return (
    <div>
      <h1>Detail Gallery</h1>
      {memberInfo && (
        <div>
          <h2>{memberInfo.name}</h2>
          <img id="gallery-profile-pic" src={memberInfo.profilePic} />
          <div className="member-info">
            <h4>
              Age <span id="tag">{memberInfo.age}</span>
            </h4>
            <h4>
              Ranking <span id="tag">{memberInfo.ranking}</span>
            </h4>
            <p>{memberInfo.bio}</p>
          </div>

          <div className="action-button">
            <button className="delete-btn" onClick={onDeleteMember}>
              Delete
            </button>
            <button className="edit-btn">
              <Link to={`/gallery/edit/${params.id}`}>Edit</Link>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default DetailGallery;
