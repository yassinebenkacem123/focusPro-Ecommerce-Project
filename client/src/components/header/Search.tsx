import { BiSearch } from "react-icons/bi";

type SearchProps = {
  setOpenSearch: React.Dispatch<React.SetStateAction<boolean>>;
};

const Search = ({ setOpenSearch }: SearchProps) => {
  return (
    <div
      onClick={() => setOpenSearch((prev) => !prev)}
      className="border-2 hover:bg-orange-500/90 cursor-pointer bg-orange-500 text-white border-stone-800 rounded-full p-3"
    >
      <BiSearch size={20} />
    </div>
  );
};

export default Search;
