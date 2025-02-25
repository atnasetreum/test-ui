"use client";

import { useEffect, useState } from "react";

import ApplicationsAutoComplete from "./components/ApplicationsAutoComplete";
import { ApplicationsService } from "./services/applications.service";
import AplicationCurrent from "./components/AplicationCurrent";
import CardApplication from "./components/CardApplication";
import { Application } from "./ts/application.interfaces";

export default function Home() {
  const [applicationCurrent, setApplicationCurrent] =
    useState<Application | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchApplications = async () => {
    setIsLoading(true);
    const response = await ApplicationsService.findAll({}).finally(() => {
      setIsLoading(false);
    });

    setApplications(response);
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return isLoading ? (
    <div className="flex justify-center items-center h-screen">
      <p className="text-2xl font-bold text-coolGray-800">Loading...</p>
    </div>
  ) : (
    <div className="container m-auto">
      <h1 className="text-4xl font-bold text-center text-gray-800 p-8">
        Applications ({applications.length})
      </h1>
      {applicationCurrent && (
        <AplicationCurrent
          application={applicationCurrent}
          remove={() => setApplicationCurrent(null)}
        />
      )}
      <div className="mb-4 w-1/2 m-auto">
        <ApplicationsAutoComplete
          setApplicationCurrent={setApplicationCurrent}
        />
      </div>
      <div className="grid grid-cols-4 gap-4">
        {applications.map((application) => (
          <CardApplication key={application.id} application={application} />
        ))}
      </div>
    </div>
  );
}
