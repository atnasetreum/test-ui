"use client";

import {
  Dispatch,
  KeyboardEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import Image from "next/image";

import confetti from "canvas-confetti";

import { ApplicationsService } from "../services/applications.service";
import { Application } from "../ts/application.interfaces";
import { clearDomain, delay } from "../utils";

interface Props {
  setApplicationCurrent: Dispatch<SetStateAction<Application | null>>;
}

const ApplicationsAutoComplete = ({ setApplicationCurrent }: Props) => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [idxApplication, setIdxApplication] = useState<number>(0);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>("");

  const findApplications = async ({
    name,
  }: {
    name?: string;
  }): Promise<void> => {
    setIsLoading(true);

    const response = await ApplicationsService.findAll({ name });

    setIsLoading(false);

    setApplications(response);
  };

  useEffect(() => {
    findApplications({});
  }, []);

  useEffect(() => {
    const timeOutId = setTimeout(
      () =>
        findApplications({
          name: keyword,
        }),
      800
    );
    return () => clearTimeout(timeOutId);
  }, [keyword]);

  const handleSearch = async (
    e: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    setKeyword(e.target.value);
  };

  const updateListSelection = (itemId: string): void => {
    const list = document.getElementById("applications-list");
    const targetLi = document.getElementById(itemId);

    if (!list || !targetLi) return;

    const listRect = list.getBoundingClientRect();
    const targetLiRect = targetLi.getBoundingClientRect();

    if (targetLiRect.top < listRect.top) {
      list.scrollTop -= listRect.top - targetLiRect.top;
    } else if (targetLiRect.bottom > listRect.bottom) {
      list.scrollTop += targetLiRect.bottom - listRect.bottom;
    }
  };

  const handleOnBlur = (): void => {
    setIsFocused(false);
    setIdxApplication(0);
  };

  const handleSelect = async (application: Application): Promise<void> => {
    setApplicationCurrent(application);
    setKeyword("");
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
    handleOnBlur();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    switch (e.key) {
      case "ArrowDown":
        setIdxApplication((prev) =>
          prev < applications.length - 1 ? prev + 1 : prev
        );
        updateListSelection(`applications-list-${idxApplication + 1}`);
        break;
      case "ArrowUp":
        setIdxApplication((prev) => (prev > 0 ? prev - 1 : prev));
        updateListSelection(`applications-list-${idxApplication - 1}`);
        break;
      case "Enter":
        handleSelect(applications[idxApplication]);
        break;
    }
  };

  return (
    <>
      <input
        type="text"
        placeholder="Search Applications"
        className="border px-3 mb-4 py-2 w-full
          rounded-lg
          text-black
          hover:border-2
          hover:border-blue-700 
          focus:outline-none 
          focus:ring-2 focus:ring-blue-700
        "
        disabled={isLoading}
        value={keyword}
        onChange={handleSearch}
        onClick={() => setIsFocused(true)}
        onBlur={() => delay(500).then(() => handleOnBlur())}
        onKeyDown={handleKeyDown}
      />
      {applications.length > 0 && isFocused && !isLoading && (
        <ul className="border overflow-auto h-60" id="applications-list">
          {applications.map((application, idx) => (
            <li
              key={application.id}
              id={`applications-list-${idx}`}
              className={`px-2 focus:outline-none py-3 hover:bg-gray-200 cursor-pointer hover:text-black ${
                idxApplication === applications.indexOf(application)
                  ? "bg-gray-200 text-black"
                  : ""
              }`}
              onClick={() => handleSelect(application)}
            >
              <div className="grid grid-cols-10">
                <div className="row-span-2 pr-2">
                  <Image
                    src={`/icons/ic_${application.id}.svg`}
                    alt={application.name}
                    width="0"
                    height="0"
                    sizes="100vw"
                    className="w-full h-auto"
                  />
                </div>
                <div className="col-start-2 row-start-1 text-lg font-bold">
                  {application.name}
                </div>
                <div className="col-start-2 row-start-2">
                  {clearDomain(`${application.domains[0] || ""}`)}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {applications.length === 0 && !isLoading && (
        <div className="border flex justify-center items-center h-60">
          No applications found
        </div>
      )}

      {isLoading && keyword && (
        <div className="flex justify-center space-x-1">
          <div
            className="w-4 h-4 bg-red-500
                    rounded-full animate-bounce"
          ></div>
          <div
            className="w-4 h-4 bg-red-500
                    rounded-full animate-bounce
                    delay-100"
          ></div>
          <div
            className="w-4 h-4 bg-red-500
                    rounded-full animate-bounce
                    delay-200"
          ></div>
        </div>
      )}
    </>
  );
};

export default ApplicationsAutoComplete;
