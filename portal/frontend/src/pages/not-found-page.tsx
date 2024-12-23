const NotFoundPage = () => {
    return (
        <section className="py-32 flex justify-center">
            <div className="flex flex-col px-10">
                <div className="flex justify-center">
                    <div className="bg-[#C6FCA6]/5 py-2 px-4 text-[#C6FCA6]/85 rounded-lg font-semibold text-sm">
                        404 Error
                    </div>
                </div>
                <h1 className="text-2xl md:text-4xl  font-semibold leading-relaxed text-center mt-6">
                    We&apos;ve lost this page.
                </h1>
                <p className="max-w-[35ch] text-xs sm:text-sm md:text-normal text-white/70 mx-auto leading-relaxed text-center mt-3">
                    Sorry, the page you're looking for doesn't exist or has been
                    moved.
                </p>
            </div>
        </section>
    );
};

export default NotFoundPage;
