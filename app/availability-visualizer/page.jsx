"use client";
import { useState, useEffect  } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import "../styles"
// import { clockFaceBig, uploadIcon } from "../../public/images"

function AvailabilityVisualizer() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [response, setResposne] = useState(null)

  const formik = useFormik({
    initialValues: {
      imageUrl: "",
    },
    validationSchema: Yup.object({
      imageUrl: Yup.string().url("Invalid URL").required("Image URL is required.")
    }),
    onSubmit: (values) => {console.log(values)}
  })

  const [overlayDisplay, setOverlayDisplay] = useState("none")

  function toggleOverlay() {
    if (overlayDisplay == "none") {
      setOverlayDisplay("flex")
    } else {
      setOverlayDisplay("none")
    }
  }
  
  const [selectedFile, setSelectedFile] = useState(null)
  const [imageURL, setImageURL] = useState("null")

  async function handleFileChange(event) {
    setLoading(true), setError(null), setResposne(null)
    const files = event.target.files;
    if (files && files.length > 0) {

      const file = files[0]
      setSelectedFile(file)
      
      const url = URL.createObjectURL(file)
      setImageURL(url)
      const reader = new FileReader()

      reader.onloadend = async () => {
        const base64ImageData = reader.result

        try {
          const res = await fetch("/api/vision", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ imageUrl: base64ImageData })
          })

          if (!res.ok) {
            throw new Error("GPT API call failed to fetch.")
          }

          const data = await res.json()
          console.log(data)
          setResposne(data)
          return data
          
        } catch (error) {
          setError(error.message)
          console.log("From Riley:\n", error)
        } finally {
          setLoading(false)
          console.log("Fetch code finished running.")
        }
        // URL.revokeObjectURL(url)
        }
      
      reader.readAsDataURL(file)
    }
  };

  return (
    <div>
      <div className="overlay" style={{display: overlayDisplay}}>
        <div id="overlay-background" onClick={toggleOverlay}></div>
        <img id="screenshot-preview" src={imageURL} alt="No Image uploaded"></img>
      </div>

      <header id="nav-bar">

        <div id="nav-bar-content">
          
          <section id="left-section">
            <img id="clock-icon" src="/images/clock-face-500x500.png" alt=""></img>
            <h1 id="title">Availability Visualizer</h1>
          </section>

          <section id="nav-buttons"></section>

          <section id="nav-buttons">

            <div id="debug-toggle" onClick={toggleOverlay}>
              <p>Debug</p>
            </div>

            <div id="data-upload-container">
              <form onSubmit={formik.handleSubmit}>
                <label id="upload-label" htmlFor="upload-input">
                  <img className="nav-icon" id="upload-icon" src="/images/upload-500x500.png" alt="Upload"></img>
                </label>
                <input id="upload-input" type="file" accept="image/*" onChange={handleFileChange}></input>
              </form>
            </div>

          </section>

        </div>

      </header>

      <div id="content">
        <h1 id="week-label">Week: 10/5/26 - 10/12/26</h1>

        <div className="days">
          
          <div className="day" id="monday">
            <div className="hours">
            </div>
          </div>

          <div className="day" id="tuesday">
            <div className="hours">
            </div>
          </div>

          <div className="day" id="wednesday">
            <div className="hours">
            </div>
          </div>

          <div className="day" id="thursday">
            <div className="hours">
            </div>
          </div>

          <div className="day" id="friday">
            <div className="hours">
            </div>
          </div>

          <div className="day" id="saturday">
            <div className="hours">
            </div>
          </div>

          <div className="day" id="sunday">
            <div className="hours">
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default AvailabilityVisualizer