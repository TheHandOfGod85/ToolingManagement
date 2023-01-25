import { ImageUpload } from "../../models/tooling";
import agent from "./agent";

export const uploadImages = async ({
  files,
  id,
}: ImageUpload): Promise<void> => {
  await agent.Images.uploadImages(files, id);
};

export const deleteImage = async (id: string) => {
  return await agent.Images.deleteImage(id);
};

export const setMainImage = async (id: string) => {
  return await agent.Images.setMainImage(id);
};

export const unSetMainImage = async (id: string) => {
  return await agent.Images.unSetMainImage(id);
};
