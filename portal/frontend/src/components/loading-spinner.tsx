const LoadingSpinner = () => {
    return (
        <div className="w-full flex justify-center py-20 flex-col">
            <div className="size-7 border-[5px] border-white/20 rounded-full border-t-[#C6FCA6] animate-spin duration-700 mx-auto" />
        </div>
    );
};

export default LoadingSpinner;
