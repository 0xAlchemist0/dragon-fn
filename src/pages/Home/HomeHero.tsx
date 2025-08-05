import {
  Exchange1inch,
  NetworkAvalanche,
  NetworkEthereum,
  NetworkSonic,
  NetworkZeroNetwork,
  TokenIcon,
} from "@web3icons/react";

function HomeHero() {
  return (
    <div className=" ">
      <span className="text-center font-bold">
        <img
          src="https://iacac.com/wp-content/uploads/2025/04/ticket.gif"
          alt=""
          className="size-45 m-auto"
        />
        <h1 className="text-white text-2xl">Make DeFi Fun Again</h1>
        <h3 className="text-gray-400 text-md leading-relaxed mt-4">
          Turn every trade into a thrilling jackpot adventure with Red Dragon —
          where DeFi meets calculated risk and game-changing rewards!
        </h3>
      </span>
      <span className="grid grid-flow-row gap-y-2 mt-10 text-white p-5">
        <button className=" border-0 p-2 bg-[#ff6a00e0] rounded-2xl">
          View Docs
        </button>
        <button className="border-0 p-2 rounded-2xl bg-[#ff6a00e0]">
          Start Voting
        </button>
      </span>
      <span className=" text-center text-white text-sm">
        <h1 className="mt-5">Powered By The Best In The Industry</h1>
        {/* Should be mapped to repeat repetetive code */}
        <span className="grid grid-flow-col text-sm mt-5  justify-center gap-5">
          <TokenIcon symbol="link" variant="mono" size="43" color="#FFFFFF" />
          <NetworkSonic variant="mono" size="43" color="#FFFFFF" />
          <Exchange1inch variant="mono" size="43" color="#FFFFFF" />
          <NetworkAvalanche variant="mono" size="43" color="#FFFFFF" />
          <NetworkEthereum variant="mono" size="43" color="#FFFFFF" />
          <NetworkZeroNetwork variant="mono" size="43" color="#FFFFFF" />
          <NetworkZeroNetwork variant="mono" size="43" color="#FFFFFF" />
        </span>
      </span>
    </div>
  );
}

export default HomeHero;
