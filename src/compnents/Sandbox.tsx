import { useEffect } from "react";
import useVotingNew from "../hooks/useVotingNew";

function Sandbox() {
  const instance = useVotingNew();
  // const { state, dispatch } = useSandBox();
  // cons;

  useEffect(() => {
    if (instance) {
    }
  }, [instance]);

  // const handleTx = () => {
  //   if (state.isReady) {
  //     dispatch({ type: "set", payload: { isReady: false } });
  //   } else {
  //     dispatch({ type: "set", payload: { isReady: true } });
  //   }
  // };

  return (
    <div>
      <button className="text-white">hello</button>
    </div>
  );
}

export default Sandbox;
