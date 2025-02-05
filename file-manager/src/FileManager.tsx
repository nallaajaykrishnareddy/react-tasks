import { v4 } from "uuid";
import { FileFolderItem } from "./FileFolderItem";
import { useState } from "react";

export type Folder = {
  id: string;
  name: string;
  isFolder: boolean;
  isEditable: boolean;
  files?: { id: string; name: string; isEditable: boolean }[];
  nestedFolders?: Folder[];
};

const FOLDERS: Folder[] = [
  {
    id: v4(),
    name: "Root",
    isFolder: true,
    isEditable: false,
    nestedFolders: [
      {
        id: v4(),
        name: "folder1",
        isFolder: true,
        isEditable: false,
        files: [
          {
            id: v4(),
            name: "file1.txt",
            isEditable: false,
          },
          {
            id: v4(),
            name: "file2.txt",
            isEditable: false,
          },
        ],
        nestedFolders: [
          {
            id: v4(),
            name: "folder1",
            isFolder: true,
            isEditable: false,
            files: [
              {
                id: v4(),
                name: "file1.txt",
                isEditable: false,
              },
              {
                id: v4(),
                name: "file2.txt",
                isEditable: false,
              },
            ],
          },
        ],
      },
    ],
    files: [
      {
        id: v4(),
        name: "file1.txt",
        isEditable: false,
      },
      {
        id: v4(),
        name: "file2.txt",
        isEditable: false,
      },
    ],
  },
];

export const FileManager = () => {
  const [folders, setFolders] = useState(FOLDERS);

  const handleFolderCreation = (folderId: string) => {
    const createFolder = (
      prevFolders: Folder[],
      folderID: string
    ): Folder[] => {
      return prevFolders.map((prevFolder) => {
        if (prevFolder.id === folderID) {
          return {
            ...prevFolder,
            nestedFolders: [
              ...(prevFolder.nestedFolders ?? []),
              {
                id: v4(),
                name: "New folder",
                isEditable: true,
                isFolder: true,
              },
            ],
          };
        }

        if (prevFolder.nestedFolders) {
          return {
            ...prevFolder,
            nestedFolders: createFolder(prevFolder.nestedFolders, folderID),
          };
        }

        return prevFolder;
      });
    };

    setFolders((prevFolders) => createFolder(prevFolders, folderId));
  };

  const handleFolderRename = (folderId: string, folderName: string) => {
    const rename = (
      prevFolders: Folder[],
      folderId: string,
      folderName: string
    ): Folder[] => {
      return prevFolders.map((prevFolder) => {
        if (prevFolder.id === folderId) {
          return {
            ...prevFolder,
            name: folderName,
            isEditable: false,
          };
        }

        if (prevFolder.nestedFolders) {
          return {
            ...prevFolder,
            nestedFolders: rename(
              prevFolder.nestedFolders,
              folderId,
              folderName
            ),
          };
        }

        return prevFolder;
      });
    };

    setFolders((prevFolders) => rename(prevFolders, folderId, folderName));
  };

  return (
    <>
      {folders.map((folder) => {
        return (
          <FileFolderItem
            folder={folder}
            key={folder.id}
            handleFolderCreation={handleFolderCreation}
            handleFolderRename={handleFolderRename}
          />
        );
      })}
    </>
  );
};
