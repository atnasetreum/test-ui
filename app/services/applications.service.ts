import { toast } from "sonner";

import { Application } from "../ts/application.interfaces";
import axiosInstance from "./axios.wrapper";
import { delay } from "../utils";

const findAll = async ({ name }: { name?: string }): Promise<Application[]> => {
  await delay(1500);
  const response = await axiosInstance
    .get(`/applications${name ? `?name=${name}` : ""}`)
    .catch((error) => {
      const message = error.response?.data?.error || error.message;

      toast.error(message);
      return [];
    });

  return response as Application[];
};

export const ApplicationsService = {
  findAll,
};
