import "../../assets/css/cssgram.css";
import { FilterCardProps } from "./types";
import Image from "../Image";

const FilterCard = ({
  src,
  filter,
  selected,
  setSelectedFilter,
}: FilterCardProps) => {
  return (
    <li
      className={`flex cursor-pointer flex-col mr-2 hover:text-black ${
        selected ? "text-black font-semibold" : "text-gray-500"
      }`}
      onClick={() => setSelectedFilter(filter)}
    >
      {src && <span className="text-center w-full">{filter.label}</span>}
      <Image
        src={src as string}
        style={{ maxWidth: "100px" }}
        className={`w-48 object-scale-down ${filter.name}`}
        skeletonHeight={100}
        skeletonWidth={120}
      />
    </li>
  );
};

export default FilterCard;
