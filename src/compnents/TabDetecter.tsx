import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaWallet } from "react-icons/fa";
import { LuWaves } from "react-icons/lu";
function TabDetector({ type, balances }: any) {
  function DetectElement({ type, balances }: any) {
    switch (type) {
      case "tokens":
        return <Tokens balances={balances} />;
        break;
      case "locks":
        return <Locks balances={balances} />;
        break;
      case "votes":
        return <Votes balances={balances} />;
        break;
      case "pools":
        return <Pools balances={balances} />;
        break;
    }
  }

  function isEmpty({ balances }: any) {
    if (balances) {
      return (
        balances.tokens.dragon.balance > 0 && balances.tokens.lp.balance > 0
      );
    }
    return true;
  }

  function Tokens({ balances }: any) {
    const notEmpty = isEmpty(balances);
    return (
      <>
        {balances.tokens && Object.keys(balances.tokens).length > 0 ? (
          <div
            className="grid grid-flow-row gap-3"
            style={{ animation: "var(--fadein)" }}
          >
            {Object.entries(balances.tokens).map(([key, token]: any) => (
              <span key={key}>
                <DrawerItem
                  src1={"/src/assets/logo_new.png"}
                  src2={
                    "https://raw.githubusercontent.com/balancer/tokenlists/main/src/assets/images/tokens/0x039e2fb66102314ce7b64ce5ce3e5183bc94ad38.png"
                  }
                  name={token.name}
                  balance={Math.floor(token.balance)}
                  surname={token.surname}
                />
              </span>
            ))}
          </div>
        ) : null}
      </>
    );
  }
  function Locks({ balances }: any) {
    return (
      <>
        {balances.lockInfo ? (
          <div
            className="flex justify-between"
            style={{ animation: "var(--fadein)" }}
          >
            <span className="flex gap-4">
              <div className="relative size-9">
                {/* Main image or content */}
                <img
                  src={"/src/assets/logo_new.png"}
                  alt="https://raw.githubusercontent.com/balancer/tokenlists/main/src/assets/images/tokens/0x039e2fb66102314ce7b64ce5ce3e5183bc94ad38.png"
                  className="w-full h-full rounded-full object-cover"
                />

                {/* Badge in bottom-right */}
                <div className="absolute bottom-1 left-5 rig top-4.5 size-5 rounded-md border-2 border-[#4C5C68] bg-[#4C5C68] overflow-hidden">
                  <img
                    src={
                      "https://raw.githubusercontent.com/balancer/tokenlists/main/src/assets/images/tokens/0x039e2fb66102314ce7b64ce5ce3e5183bc94ad38.png"
                    }
                    alt="Badge"
                    className="w-full h-full object-cover bg-stone-500"
                  />
                </div>
              </div>
              <div className="text-white grid grid-flow-row">
                <h3>{balances.lockInfo[0]}</h3>
                <h3 className="text-white/80 text-xs">
                  Locked until {balances.lockInfo[1]}
                </h3>
              </div>
            </span>
          </div>
        ) : (
          <div
            className="mt-5 p-10 text-center text-white text-sm drawer-content-goes-here-tokens-etc"
            style={{ animation: "var(--fadein)" }}
          >
            <span>
              <FaWallet className="text-[50px] text-white/50 m-auto" />
              <h3 className="font-bold mt-3">No Locks Yet</h3>
              <h3 className="text-white/70 ">
                Buy or s tokens to this wallet to get started.
              </h3>
            </span>
          </div>
        )}
      </>
    );
  }
  function Votes({ balances }: any) {
    return (
      <>
        {balances.votes ? (
          <div
            className="grid grid-flow-row gap-2"
            style={{ animation: "var(--fadein)" }}
          >
            {balances.votes.map((vote: any, key: any) => {
              return (
                <span key={key} className="">
                  <DrawerItem
                    src1={"/src/assets/logo_new.png"}
                    src2={
                      "https://raw.githubusercontent.com/balancer/tokenlists/main/src/assets/images/tokens/0x039e2fb66102314ce7b64ce5ce3e5183bc94ad38.png"
                    }
                    name={vote.name}
                    balance={vote.votes}
                  />
                </span>
              );
            })}
          </div>
        ) : (
          <div className="mt-5 p-10 text-center text-white text-sm drawer-content-goes-here-tokens-etc">
            <span>
              <FaWallet className="text-[50px] text-white/50 m-auto" />
              <h3 className="font-bold mt-3">No Tokens Yet</h3>
              <h3 className="text-white/70 ">
                Buy or s tokens to this wallet to get started.
              </h3>
            </span>
          </div>
        )}
      </>
    );
  }
  function Pools({ balances }: any) {
    return (
      <>
        {balances.pools ? (
          <div
            className="mt-5 p-10 text-center text-white text-sm drawer-content-goes-here-tokens-etc"
            style={{ animation: "var(--fadein)" }}
          >
            <span>
              <LuWaves className="text-[50px] text-white/50 m-auto" />
              <h3 className="font-bold mt-3">No Pools Yet</h3>
              <h3 className="text-white/70 ">
                Buy or s tokens to this wallet to get started.
              </h3>
            </span>
          </div>
        ) : (
          <div
            className="mt-5 p-5 text-center text-white text-sm drawer-content-goes-here-tokens-etc"
            style={{ animation: "var(--fadein)" }}
          >
            <span>
              <LuWaves className="text-[50px] text-white/50 m-auto" />
              <h3 className="font-bold mt-3">No Pools Yet</h3>
              <h3 className="text-white/70 ">
                Create a position on shadow to this wallet to get started.
              </h3>
            </span>
          </div>
        )}
      </>
    );
  }

  function DrawerItem({
    src1,
    src2,
    name,
    balance,
    surname = null,
    isLock,
  }: any) {
    return (
      <div className=" flex justify-between">
        <div className="flex gap-4">
          <div className="relative size-9">
            {/* Main image or content */}
            <img
              src={src1}
              alt="https://raw.githubusercontent.com/balancer/tokenlists/main/src/assets/images/tokens/0x039e2fb66102314ce7b64ce5ce3e5183bc94ad38.png"
              className="w-full h-full rounded-full object-cover"
            />

            {/* Badge in bottom-right */}
            <div className="absolute bottom-1 left-5 rig top-4.5 size-5 rounded-md border-2 border-[#4C5C68] bg-[#4C5C68] overflow-hidden">
              <img
                src={src2}
                alt="Badge"
                className="w-full h-full object-cover bg-[#2A2B30]"
              />
            </div>
          </div>
          <div className="grid grid-rows-2 text-white font-bold">
            <h3 className="text-sm">{name}</h3>
            <h3 className="text-xs text-start text-white/80">
              {surname ? (
                surname
              ) : (
                <>{name.substring(0, 1) + name.substring(1, 2)}</>
              )}
            </h3>
          </div>
        </div>
        <div className="text-white grid grid-rows-2">
          <h3 className="text-sm">{balance}</h3>
          <h3 className="text-sm text-end">$0.00</h3>
        </div>
      </div>
    );
  }

  function Loading() {
    return (
      <div className="text-white/70 font-bold text-[40px] mt-14 flex justify-center ">
        <AiOutlineLoading3Quarters className="animate-spin" />
      </div>
    );
  }

  return (
    <>
      {balances ? (
        <DetectElement type={type} balances={balances} />
      ) : (
        <Loading />
      )}
    </>
  );
}

export default TabDetector;
