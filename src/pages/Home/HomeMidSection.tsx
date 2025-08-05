import { FaTicketSimple } from "react-icons/fa6";
import midCardContent from "./midCardContent";
function HomeMidSection() {
  console.log(midCardContent);
  function MapCards() {
    const cardMapping: any = midCardContent.map((item) => {
      const { title, message }: any = item;
      return (
        <div key={title} className="border p-2">
          <span className="flex gap-3">
            <FaTicketSimple />
            <h1 className="text-lg p-2 font-semibold">{title}</h1>
          </span>
          <h5 className="text-sm  p-2">{message}</h5>
        </div>
      );
    });
    return cardMapping;
  }
  return (
    <div className="mt-5">
      <div className="grid grid-flow-row md:grid-flow-col p-5 text-white gap-5">
        <MapCards />
      </div>
    </div>
  );
}

export default HomeMidSection;
