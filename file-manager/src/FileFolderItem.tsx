import { useState } from "react";
import { Folder } from "./FileManager";

type Props = {
  folder: Folder;
  handleFolderCreation: (folderID: string) => void;
  handleFolderRename: (folderID: string, folderName: string) => void;
};

export const FileFolderItem = ({
  folder,
  handleFolderCreation,
  handleFolderRename,
}: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [folderName, setFolderName] = useState("New folder");

  return (
    <div style={{ marginLeft: "20px" }}>
      <h3>
        <button onClick={() => setIsExpanded((prev) => !prev)}>
          {isExpanded ? "-" : "+"}
        </button>
        {folder.isEditable ? (
          <input
            name="folderName"
            onChange={(e) => {
              setFolderName(e.target.value);
            }}
            onBlur={() => handleFolderRename(folder.id, folderName)}
            value={folderName}
            autoFocus
          />
        ) : (
          folder.name
        )}
        <button onClick={() => handleFolderCreation(folder.id)}>
          + Folder
        </button>
      </h3>

      {isExpanded &&
        folder.files?.map((file) => (
          <div key={file.id} style={{ marginLeft: "20px" }}>
            📄 {file.name}
          </div>
        ))}

      {isExpanded &&
        folder.nestedFolders?.map((nestedFolder) => (
          <FileFolderItem
            key={nestedFolder.id}
            folder={nestedFolder}
            handleFolderCreation={handleFolderCreation}
            handleFolderRename={() =>
              handleFolderRename(nestedFolder.id, folderName)
            }
          />
        ))}
    </div>
  );
};
