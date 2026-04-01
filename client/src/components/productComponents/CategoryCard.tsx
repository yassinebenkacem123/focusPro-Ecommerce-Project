const CategoryCard = ({
  categoryName,
  categoryImage,
}: {
  categoryName: string;
  categoryImage?: string;
}) => {
  return (
    <div className="group  h-100 relative a w-full overflow-hidden cursor-pointer shadow-lg">
      <img
        src={categoryImage}
        alt={categoryName}
        className="h-full w-full object-cover transition-transform duration-500 brightness-40  group-hover:scale-105"
      />
      
      <h1 className="absolute top-40  w-full text-center text-white font-bold text-5xl">
        {categoryName}
      </h1>
      <div className="absolute inset-x-0 bottom-4 px-4">
        <div className="flex items-center justify-between bg-white/10 w-[45%] p-4 backdrop-blur-md transition-all duration-300 group-hover:bg-black/30">
          <h2 className="text-lg font-semibold text-white">
              Shop Now
            </h2>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-white opacity-0 transition-all duration-300 group-hover:opacity-100">
             →
          </div>
        </div>
      </div>
    </div>
  );
};
export default CategoryCard;