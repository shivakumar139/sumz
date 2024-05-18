import { logo } from "../assets";

export const Hero = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className="flex justify-between item-center w-full mb-10 pt-3">
        <img src={logo} alt="sumz logo" className="w-28 object-contain" />

        <button
          type="button"
          onClick={() => window.open("https://github.com/shivakumar139/sumz")}
          className="black_btn"
        >
          Github
        </button>
      </nav>

      <h1 className="head_text">
        Summarize Article with <br className="max-md:hidden" />
        <span className="orange_gradient">OpenAI GPT-4</span>
      </h1>

      <h2 className="desc">
        Simplify your reading with AI powered summarization tool, an open source
        article summarizer built with OpenAI GPT-4 that transforms long articles
        into short summaries.
      </h2>
    </header>
  );
};
