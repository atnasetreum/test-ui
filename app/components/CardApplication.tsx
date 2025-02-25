import Image from "next/image";

import { Application } from "../ts/application.interfaces";
import { clearDomain } from "../utils";

interface Props {
  application: Application;
}

const CardApplication = ({ application }: Props) => {
  return (
    <div className="flex flex-col justify-center items-center p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out hover:bg-green-900">
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
      </div>
    </div>
  );
};

export default CardApplication;
