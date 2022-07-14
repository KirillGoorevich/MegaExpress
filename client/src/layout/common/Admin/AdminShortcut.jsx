import { useCallback, useEffect } from "react";

const AdminShortcut = () => {
  // handle what happens on key press
  const handleKeyPress = useCallback((event) => {
    // check if the Shift key is pressed
    if(event.key){
      if (event.key.toUpperCase() === "L" && event.ctrlKey === true) {
        window.location.href = "/admin-signup";
      }
    }
  }, []);

  useEffect(() => {
    // attach the event listener
    document.addEventListener("keydown", handleKeyPress);

    // remove the event listener
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  return null;
};

export default AdminShortcut;
