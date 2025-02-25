import Image from "next/image";
import { Application } from "../ts/application.interfaces";
import { clearDomain } from "../utils";

interface Props {
  application: Application;
  remove: () => void;
}

const AplicationCurrent = ({ application, remove }: Props) => {
  return (
    <div
      className="flex flex-col justify-center items-center p-4 rounded-lg shadow-md bg-green-900 mb-10"
      id="container-application"
    >
      <p className="text-2xl font-bold text-coolGray-800">{application.name}</p>
      <div className="container m-auto">
        <div className="flex">
          <div className="flex flex-col justify-center items-center p-1 w-20 h-20">
            <Image
              src={`/icons/ic_${application.id}.svg`}
              alt={application.name}
              width="0"
              height="0"
              sizes="100vw"
              className="w-full h-auto"
            />
          </div>
          {application.domains.map((domain) => (
            <div
              key={domain}
              className="flex flex-col justify-center items-center p-1"
            >
              <a
                href={!domain.includes("http") ? `http://${domain}` : domain}
                target="_blank"
                rel="noreferrer"
              >
                {clearDomain(domain)}
              </a>
            </div>
          ))}
        </div>
        <button
          className="bg-red-500 text-white p-2 rounded-lg mt-4"
          onClick={remove}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default AplicationCurrent;
