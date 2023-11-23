import React, { useEffect, useRef } from "react";

interface props {
  options: {
    name: string;
    callback: () => void;
  }[];
  coordinates: {
    x: number;
    y: number;
  };
  isContextMenuVisible: boolean;
  setisContextMenuVisible: (value: boolean) => void;
}

interface optionsProps {
  name: string;
  callback: () => void;
}

function ContextMenu({
  options,
  coordinates,
  isContextMenuVisible,
  setisContextMenuVisible,
}: props) {
  const contextMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (event.target.id !== "context-opener") {
        if (
          contextMenuRef.current &&
          !contextMenuRef.current.contains(event.target)
        ) {
          setisContextMenuVisible(false);
        }
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [setisContextMenuVisible]);

  const handleClick = (e: React.MouseEvent, callback: () => void) => {
    // e.stopPropagation();
    setisContextMenuVisible(false);
    callback();
  };

  return (
    <div
      className={`fixed py-2 bg-dropdown-background z-[100] shadow-xl rounded-xl`}
      ref={contextMenuRef}
      style={{ top: coordinates.y, left: coordinates.x }}
    >
      <ul>
        {options.map(({ name, callback }: optionsProps) => (
          <li
            key={name}
            onClick={(e: any) => handleClick(e, callback)}
            className="px-5 py-2 cursor-pointer hover:bg-background-default-hover"
          >
            <span className="text-white">{name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ContextMenu;
