import { Button, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import FilerobotImageEditor, {
  TABS,
  TOOLS,
} from "react-filerobot-image-editor";
import { useParams } from "react-router-dom";

export default function ImageEditor() {
  const [isImgEditorShown, setIsImgEditorShown] = useState(false);

  const openImgEditor = () => {
    setIsImgEditorShown(true);
  };

  const closeImgEditor = () => {
    setIsImgEditorShown(false);
  };
  const [download, setDownload] = useState(false);
  const [url, seturl] = useState(" ");
  const [base64, setbase64] = useState("");
  useEffect(() => {
    seturl(localStorage.getItem("imageEdit"));
  }, []);
  return (
    <div
      style={{
        minHeight: "90vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        justifyContent: "center",
      }}
    >
      {download ? (
        <Button
          variant="contained"
          href={base64}
          download="EdittedImage"
          color="primary"
          disableElevation
          style={{
            transform: "scale(0.9)",
          }}
        >
          Download
        </Button>
      ) : null}
      <FilerobotImageEditor
        source={url}
        onSave={(editedImageObject, designState) => {
          setbase64(editedImageObject.imageBase64);
          setDownload(true);
        }}
        onClose={closeImgEditor}
        annotationsCommon={{
          fill: "#ff0000",
        }}
        Text={{ text: "Filerobot..." }}
        Crop={{
          presetsItems: [
            {
              titleKey: "classicTv",
              descriptionKey: "4:3",
              ratio: 4 / 3,
              // icon: CropClassicTv, // optional, CropClassicTv is a React Function component. Possible (React Function component, string or HTML Element)
            },
            {
              titleKey: "cinemascope",
              descriptionKey: "21:9",
              ratio: 21 / 9,
              // icon: CropCinemaScope, // optional, CropCinemaScope is a React Function component.  Possible (React Function component, string or HTML Element)
            },
          ],
          presetsFolders: [
            {
              titleKey: "socialMedia", // will be translated into Social Media as backend contains this translation key
              // icon: Social, // optional, Social is a React Function component. Possible (React Function component, string or HTML Element)
              groups: [
                {
                  titleKey: "facebook",
                  items: [
                    {
                      titleKey: "profile",
                      width: 180,
                      height: 180,
                      descriptionKey: "fbProfileSize",
                    },
                    {
                      titleKey: "coverPhoto",
                      width: 820,
                      height: 312,
                      descriptionKey: "fbCoverPhotoSize",
                    },
                  ],
                },
              ],
            },
          ],
        }}
        tabsIds={[TABS.ADJUST, TABS.ANNOTATE, TABS.WATERMARK, TABS.FILTERS]} // or {['Adjust', 'Annotate', 'Watermark']}
        defaultTabId={TABS.ANNOTATE} // or 'Annotate'
        defaultToolId={TOOLS.TEXT} // or 'Text'
      />
    </div>
  );
}
