

const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-200 bg-[#fbfdfb] text-[#202923]">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-5 text-center text-xs sm:flex-row sm:px-5 sm:text-left">
        <p className="mb-1 text-xs text-[#7a8980]">
          বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </p>

        <p className="mb-1 text-xs text-[#7a8980]">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
};

export default Footer;