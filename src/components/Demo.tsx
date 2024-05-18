import { useState, useEffect } from "react";
import { copy, linkIcon, loader, tick } from "../assets";
import { Article } from "../types";
import { useLazyGetSummaryQuery } from "../services/article";
import { store } from "../services/store";

export const Demo = () => {
  const [article, setArticle] = useState<Article>({
    url: "",
    summary: "",
  });

  const [allArticles, setAllArticles] = useState<Article[]>([]);

  const [copyUrl, setCopyUrl] = useState<string>("");

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();


  useEffect(() => {
    const storedArticles = JSON.parse(localStorage.getItem("articles") as string);

    if(storedArticles){
      console.log("Yes");
      setAllArticles(storedArticles);
      console.log("After", allArticles);
    }
    console.log("allArticles", allArticles);
    console.log("storedArticles", storedArticles);

  }, [allArticles]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = (e.currentTarget.elements[0] as HTMLInputElement).value;
    if (!url) return;
    
    const { data } = await getSummary(url);

    console.log("data", data);
    if (data?.summary) {
      console.log("Yes");
      const newArticle = { ...article, summary: data.summary };
      setArticle(newArticle);
      allArticles.push(newArticle);
      setAllArticles([...allArticles]);
    }

    console.log("summary", data?.summary);
    console.log("allArticles", allArticles);
    console.log("article", article);
    

    localStorage.setItem("articles", JSON.stringify(allArticles));

  };

  const handleCopy = (copyUrl: string) => {
    setCopyUrl(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => {setCopyUrl("")}, 2000);
    
  }

  
  return (
    <section className="mt-16 w-full max-w-xl">
      <div className="flex flex-col w-full gap-2">
        <form 
          className="relative flex justify-center items-center"
          onSubmit={handleSubmit}
        >
          <img
            src={linkIcon}
            alt="link icon"
            className="absolute left-0 my-2 ml-3 w-5"
          />

          <input
            type="url"
            placeholder="Enter URL"
            value={article.url}
            required
            className="url_input peer"
            onChange={(e) => setArticle({ ...article, url: e.target.value })}
          />

          <button
            type="submit"
            className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
          >
            ↵
          </button>
        </form>

        {/* Brower url History */}
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {allArticles?.map((article, index) => {
            return (
              <div key={index} className="link_card" onClick={() => setArticle(article)}>

                <div className="copy_btn" onClick={() => handleCopy(article.url)}>
                  <img src={copyUrl == article.url ? tick: copy} alt="copy icon" className="w-[40%] h-[40%] object-contain" />

                </div>

                <p className="flex-1 font-satoshi text-blue-700 font-medium text-small truncate">
                  {article.url}
                </p>

                
              </div>
            )
          })}
        </div>
      </div>

      {/* Display Results */}

      <div className="my-10 max-w-full flex justify-center items-center">

        {isFetching && <img src={loader} alt="loader" className="w-20 h-20 object-contain" />}
        {error && <p className="text-black-500 text-center font-satoshi">An error occurred
        </p>}

        {article.summary && <div className="flex flex-col gap-3"> 
          <h2 className="font-satoshi font-bold text-gray-600 text-xl">
            Article <span className="blue_gradient">Summary</span>
          </h2>
          <div className="summary_box">
            <p className="font-inter font-medium text-sm text-gray-700">
              {article.summary}
            </p>
          </div>
        </div>}

      </div>
    </section>
  );
};
