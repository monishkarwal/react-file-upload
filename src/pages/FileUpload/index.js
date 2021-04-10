import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Avatar,
  Container,
  Fab,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import FolderIcon from "@material-ui/icons/Folder";
import DeleteIcon from "@material-ui/icons/Delete";
import Layout from "../../components/Layout";

// File Upload Component
const FileUploadInput = ({ addFile, uploadFiles }) => {
  return (
    <>
      <input
        accept="*"
        id="file-upload-icon"
        type="file"
        multiple
        hidden
        onChange={(event) => addFile(event.target.files)}
      />
      <label htmlFor="file-upload-icon">
        <Fab color="primary" aria-label="add" component="span">
          <AddIcon />
        </Fab>
      </label>
    </>
  );
};

// File Item Component
const FileItem = ({ uuid, fileName, deleteFile }) => {
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <FolderIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={fileName} />
      <ListItemSecondaryAction>
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={() => deleteFile(uuid)}
        >
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

// File List Component
const FileList = ({ filesData, deleteFile }) => {
  if (!filesData) {
    return;
  }
  return (
    <List>
      {filesData.map(({ uuid, fileContent }) => (
        <FileItem
          key={uuid}
          uuid={uuid}
          fileName={fileContent.name}
          deleteFile={deleteFile}
        />
      ))}
    </List>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
}));

const FileUpload = () => {
  // Files Data
  const initialState = [];
  const [files, setFiles] = useState(initialState);

  // File Actions
  const addFile = (fileData) => {
    if (!fileData) {
      return;
    }
    let filesArr = [];
    let eventFilesArr = Array.from(fileData);
    for (let file of eventFilesArr) {
      let uuid = uuidv4();
      filesArr.push({ fileContent: file, uuid });
    }
    setFiles([...files, ...filesArr]);
  };

  const deleteFile = (uuid) => {
    let filesArr = files.filter((item) => item.uuid !== uuid);
    setFiles([...filesArr]);
  };

  const uploadFiles = () => {
    console.log("Uploading Files");
  };

  const classes = useStyles();

  return (
    <Layout>
      <Container className={classes.root} component="div">
        <FileUploadInput addFile={addFile} uploadFiles={uploadFiles} />
        <FileList filesData={files} deleteFile={deleteFile} />
      </Container>
    </Layout>
  );
};

export default FileUpload;
