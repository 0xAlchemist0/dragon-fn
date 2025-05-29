import { LockProvider } from "../../context-providers/LockProvider";
import LockSwapTabs from "./LockSwapTabs";
import VotingPowerCard from "./VotingPowerCard";

function TestLPLockMenu() {
  return (
    <LockProvider>
      <div className=" container p-3 flex justify-center ">
        <div className="max-w-150   grid lg:grid-flow-col lg:gap-3">
          <div className="p-3 visible lg:hidden">
            <VotingPowerCard />
            Context
          </div>
          <div className="mt-4 flex  justify-center">
            <LockSwapTabs />
          </div>
          <div className="invisible lg:visible mt-20">
            <VotingPowerCard />
          </div>
        </div>
      </div>
    </LockProvider>
  );
}

export default TestLPLockMenu;
