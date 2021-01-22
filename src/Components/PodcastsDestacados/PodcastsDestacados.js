import React from "react";
import { PodcastCard } from "../PodcastCard/PodcastCard";
import "./PodcastsDestacados.css";
import { useEffect, useState } from "react";
import { serverRequest } from "../../helpers/urlBack";
import {getUserId, setSession, getToken} from "../../util/LocalStorage.utils";

export const PodcastsDestacados = () => {
  const [listaPodcastsUser, setListaPodcastsUser] = useState([]);
  const url = window.location.href;
  const userId = getUserId();
  useEffect(() => {

    const token = getToken();
    const userId = getUserId();
    console.log("->");
    console.log(`data/podcast/?id_author=${userId}`);

    if (url === "http://localhost:3000/myPodcasts" || url === "http://localhost:3000/profile") {
      serverRequest(`data/podcast/?id_author=${userId}`, "GET")
        .then((response) => {
          setListaPodcastsUser(response)
        })
        .catch(console.log);
    }
    else {
      serverRequest(`data/podcast/`, "GET")
        .then((response) => {
          setListaPodcastsUser(response)
        })
        .catch(console.log);
    }


  }, [url]);
  return (
    <div className="PodcastsDestados-wrap padding-10">
      {listaPodcastsUser.map(podcast =>
      (
        <PodcastCard
          title={podcast.title}
          categories={podcast.categories}
          author={podcast.author}
          img={podcast.img}
        />
      ))}
    </div>
  );
};
