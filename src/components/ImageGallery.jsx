/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
// src/components/ImageGallery.js
import "../stylesheets/ImageGallery.css";
import "../stylesheets/Image.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../config/config";

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  let i;
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          `https://api.unsplash.com/photos/random/?count=30&client_id=${config.unsplashAccessKey}`,
          {
            headers: {
              Authorization: `Client-ID ${config.unsplashAccessKey}`,
            },
          }
        );
        const data = response.data;
        setImages(data);
      } catch (error) {
        console.error(error);
      }
    };
    if (!query) {
      fetchImages();
    }
    // fetchImages();
    // Delay the API request by 500ms after the user stops typing
    // const delayTimer = setTimeout(fetchImages, 500);

    // return () => clearTimeout(delayTimer); // Clear the timer on component unmount
  }, []);
  useEffect(() => {
    const fetchImage = async () => {
      try {
        if (query.trim() !== "") {
          const response = await axios.get(
            `https://api.unsplash.com/search/photos/?page=1&per_page=30&query=${query}`,
            {
              headers: {
                Authorization: `Client-ID ${config.unsplashAccessKey}`,
              },
            }
          );
          console.log(response.data.results);
          setImages(response.data.results);
        } else {
          setImages([]); // Clear the images if the search query is empty
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchImage();
    // Delay the API request by 500ms after the user stops typing
    const delayTimer = setTimeout(fetchImage, 500);

    return () => clearTimeout(delayTimer); // Clear the timer on component unmount
  }, [query]);

  const photoClose = () => {
    let singlePhoto = document.querySelector(".single-photo");
    singlePhoto.style.display = "none";
  };
  const popup = (url) => {
    i = String(url);
    // console.log(i ,"i am i");
    if (url !== "") {
      document.querySelector(".single-photo").style.display = "block";
      document.querySelector(".single-photo").lastElementChild.src = i;
    }
  };
  const gallery = images.map((image) => (
    <div className="card" key={image.id}>
      <div
        onClick={() => {
          popup(image.urls.regular);
        }}
        className="card-image"
      >
        <img src={image.urls.thumb} alt={image.alt_description} />
      </div>
      <div className="card-image-info">
        <div className="profile-image">
          <span className="profile-image-div">
            <img
              className="profile-image-image"
              src={image.user.profile_image.small}
              alt={image.user.location}
            />
          </span>
          <div className="user-portfolio">
            <a
              href={image.user.links.photos}
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none pointer"
            >
              {image.user.name}
            </a>
          </div>
        </div>
        <div className="user-image-likes">👍{image.likes}</div>
      </div>
    </div>
  ));
  // console.log(gallery)
  function im() {
    return (
      <div className="single-photo">
        <button onClick={photoClose} className="cancel-icon">
          ❌
        </button>
        <img alt="icon" />
      </div>
    );
  }
  const submithandler = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="App">
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light ">
          <div className="container-fluid mx-auto ">
            <a className="navbar-brand" href="#">
              <h2> Image Gallery</h2>
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse "
              id="navbarSupportedContent"
            >
              <form onSubmit={submithandler} className="d-flex w-50 mx-auto">
                <input
                  className="form-control me-2"
                  type="text"
                  aria-label="Search"
                  placeholder="Search for images"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </form>
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                <li className="nav-item mx-auto">
                  <a
                    className="nav-link active fw-bold"
                    aria-current="page"
                    href="#"
                  >
                    Explore
                  </a>
                </li>
                <li className="nav-item mx-auto">
                  <a className="nav-link active fw-bold" href="#">
                    Collection
                  </a>
                </li>
                <li className="nav-item mx-auto">
                  <a className="nav-link active fw-bold" href="#">
                    Community
                  </a>
                </li>
                <li className="nav-item mx-auto d-flex align-items-center">
                <a className="nav-link active fw-bold" href="#">
                    Web Developer
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        {/*section  */}
        <div className="section">
          <img src="https://images.unsplash.com/photo-1530645722516-a0c947925cf0?auto=format&fit=crop&q=80&w=1374&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
          
          <input
            className="form-control"
            type="text"
            aria-label="Search"
            placeholder="Search for images"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <span>Search for images here for example food,travel,cars</span>
        </div>
        {/*  */}
        <div className="image">{gallery}</div>

        {i !== "" ? im() : null}
      </div>
    </>
  );
};

export default ImageGallery;