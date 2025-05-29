import { useContext } from "react";
import { LockContext } from "../../context-providers/LockProvider";

function PoolPairItem({ pool, handleClose }: any) {
  const { name, symbol, address, logo1, logo2 } = pool;
  const { dispatch }: any = useContext(LockContext);

  const handleSelection = () => {
    console.log(pool);
    dispatch({ type: "set", payload: { poolSelected: pool } });
    handleClose();
  };

  return (
    <div className="">
      <button
        className=" w-full flex gap-2 whitespace-nowrap border-0 rounded-lg p-2  bg-[#2A2B30] hover:bg-[#38383f]"
        onClick={handleSelection}
      >
        <div className="relative size-9">
          {/* Main image or content */}
          <img
            src={logo2}
            alt={logo1}
            className="w-full h-full rounded-full object-cover"
          />

          {/* Badge in bottom-right */}
          <div className="absolute bottom-1 left-5 rig top-4.5 size-5 rounded-md border-2 border-[#4C5C68] bg-[#4C5C68] overflow-hidden">
            <img
              src={logo1}
              alt="Badge"
              className="w-full h-full object-cover bg-stone-500"
            />
          </div>
        </div>

        <span className="grid grid-rows-2 gap-0 font-bold  text-start">
          <h3 className="text-[15px]">{name}</h3>
          <span className="grid grid-cols-2 gap-2" style={{ color: "#B0B3BA" }}>
            <h3 className="text-[12px]">{symbol}</h3>
            <h3 className="text-[12px]">
              {address.slice(0, 4)}...{address.slice(-4)}
            </h3>
          </span>
        </span>
      </button>
    </div>
  );
}

export default PoolPairItem;
