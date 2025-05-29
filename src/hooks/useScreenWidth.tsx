import { useEffect, useState } from "react";

function useScreenWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  const [position, setPosition] = useState("bottom");
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (width > 635) {
      setPosition("right");
    } else {
      setPosition("bottom");
    }
  }, [width]);

  return { width, position };
}
export default useScreenWidth;
