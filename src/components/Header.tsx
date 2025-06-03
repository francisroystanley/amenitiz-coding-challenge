const Header = () => (
  <header className="bg-black text-white shadow-md md:sticky top-0 z-50">
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <svg className="w-8 h-8 mr-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M19 5L5 19M9 5H5V9M19 15V19H15"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <h1 className="text-2xl font-bold">Chess Grandmasters Wiki</h1>
        </div>
        <div className="text-sm text-gray-300">
          <span>Powered by Chess.com API</span>
        </div>
      </div>
    </div>
  </header>
);

export default Header;
