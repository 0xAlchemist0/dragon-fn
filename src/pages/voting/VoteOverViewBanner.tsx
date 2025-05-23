import React from "react";
import { useUserStats } from "../../hooks/useUserStats";
import VoteItem from "./VoteItem";
import VotingTopCard from "./VotingTopCard";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
// all these will be in a sepoerate component
function VoteOverViewBanner({ stats, state }: any) {
  const { partners } = state;
  const { votingPower, vote_amount }: any = useUserStats();
  return (
    <div>
      <div className="visible md:hidden  rounded-lg  w-90  m-auto">
        <VotingTopCard />
      </div>
      <div className="hidden md:block md:grid md:grid-cols-3 md:gap-3 lg:gap-25 md:p-10  rounded-lg  md:w-full  md:gap-3 m-auto">
        <VotingTopCard />
        <VotingTopCard />
        <VotingTopCard />
      </div>
      <div className="grid grid-flow-row  mt-10  w-full md:w-150  ms-auto me-auto">
        <div className="">
          <h3 className="text-[32px] font-semibold">Vote</h3>
          <h3 className="text-[13px] font-semibold mt-2 whitespace-nowrap">
            Vote for a partner to receive probability boost!
          </h3>
        </div>
        <div
          className={`mt-5 grid grid-flow-row ms-auto me-auto ${
            partners && "border border-[#4C5C68]"
          }    w-90 md:w-150 rounded-lg`}
        >
          {partners ? (
            partners.map((partner: any, key: any) => {
              return (
                <div key={key}>
                  <VoteItem
                    partner={partner}
                    votingPower={votingPower}
                    vote_amount={vote_amount}
                  />
                </div>
              );
            })
          ) : (
            <Loading />
          )}
        </div>
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

export default VoteOverViewBanner;
