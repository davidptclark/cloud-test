import "./App.css";

import React, { useEffect, useState } from "react";
import { AdvancedVideo } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";

// Import required actions and qualifiers.
import { fill } from "@cloudinary/url-gen/actions/resize";
import { byRadius } from "@cloudinary/url-gen/actions/roundCorners";
import { FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn";
import { Gravity } from "@cloudinary/url-gen/qualifiers";
import { AutoFocus } from "@cloudinary/url-gen/qualifiers/autoFocus";
import axios from "axios";

const App = () => {
  const [videos, setVideos] = useState([]);
  const [displayVideos, setDisplayVideos] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://394232959681238:rpEav_7-j09FtUQgWOVp69WmTW4@res.cloudinary.com/ncfiveguysuk/video/list/test.json"
      )
      .then((res) => {
        setVideos(res.data.resources);
      });
  }, []);

  useEffect(() => {
    const cld = new Cloudinary({
      cloud: {
        cloudName: "ncfiveguysuk",
      },
    });

    const myVideos = videos.map((video) => {
      console.log(video.public_id);
      const newVideo = cld.video(video.public_id, analytics: { 
        events: ['play', 'pause', 'ended', { type: 'percentsplayed', percents: [10, 40, 70, 90] }, 'error']
      } );

      newVideo
        .resize(
          fill()
            .width(300)
            .height(300)
            .gravity(
              Gravity.autoGravity().autoFocus(
                AutoFocus.focusOn(FocusOn.faces())
              )
            )
        ) // Crop the video, focusing on the faces.
        .roundCorners(byRadius(20)); // Round the corners.
      return newVideo;
    });
    setDisplayVideos(myVideos);
  }, [videos]);
  // Render the transformed video in a React component.
  return (
    <div>
      {displayVideos.map((video, index) => {
        return <AdvancedVideo key={index} cldVid={video} controls />;
      })}
    </div>
  );
};

export default App;
