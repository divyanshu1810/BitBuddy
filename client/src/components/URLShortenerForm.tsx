import { FunctionComponent, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Header";
import { Link } from "react-router-dom";
import { randomURL } from "../utils/rest";
import { failure, success } from "../utils/toast";
import { hostedlink, notificationtext } from "../utils/constants";

const URLShortenerForm: FunctionComponent = () => {
  const [destination, setDestination] = useState("");
  const [shortUrl, setShortUrl] = useState<{
    shortId: string;
  } | null>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `${process.env.REACT_APP_CLIENT_ENDPOINT}` + shortUrl?.shortId
    );
    success(`${notificationtext.copy}`);
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setShortUrl(null);

    try {
      const result = await randomURL({ destination });
      const data = await result;
      setShortUrl(data);
      success(`${notificationtext.success}`);
    } catch (error) {
      failure(`${notificationtext.errorexist}`);
    }
  }

  return (
    <div>
      <ToastContainer />
      <div className="flex justify-center">
        <div className=" rounded-md lg:w-8/12 w-10/12 top-[20%] absolute">
          <Header />
          <form
            className="flex lg:flex-row flex-col justify-center space-y-1 lg:space-y-0"
            onSubmit={handleSubmit}
          >
            <input
              className="w-full text-xl placeholder:text-white text-center lg:text-left text-white outline-none rounded-md lg:rounded-r-none lg:rounded-l-md  bg-white bg-opacity-10 hover:bg-opacity-20 backdrop-blur-lg drop-shadow-lg py-3 px-4 font-semibold"
              onChange={(e: any) => setDestination(e.target.value)}
              placeholder="Paste your link here"
            />
            <button
              disabled={!destination}
              type="submit"
              className="bg-[#23227d] text-white font-bold rounded-md lg:rounded-l-none lg:rounded-r-md px-2 md:px-10 text-xl py-3"
            >
              BitBuddy!
            </button>
          </form>
          <div className="flex justify-center pt-4">
            {shortUrl ? (
              <div className="w-full text-white md:text-2xl font-bold md:space-x-20 space-x-4 bg-white bg-opacity-10 hover:bg-opacity-20 backdrop-blur-lg drop-shadow-lg md:px-10 px-4 py-2 rounded-md">
                <div className="flex justify-between">
                  <a href={`${hostedlink}${shortUrl?.shortId}`}>
                    <div>bitbuddy.tech/{shortUrl?.shortId}</div>
                  </a>
                  <div className="flex space-x-2">
                    <Link to={`/url/analytics/${shortUrl?.shortId}`}>
                      <div className="cursor-pointer hover:scale-125">⚙️</div>
                    </Link>
                    <p
                      onClick={handleCopy}
                      className="cursor-pointer hover:scale-125"
                    >
                      📝
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default URLShortenerForm;
