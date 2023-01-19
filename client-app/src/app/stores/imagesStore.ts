import { store } from "./store";
import { makeAutoObservable, runInAction } from "mobx";
import { Image } from "../../models/tooling";
import agent from "../api/agent";

export default class ImagesStore {
  images: Image[] = [];
  constructor() {
    makeAutoObservable(this);
  }

  uploadImage = async (file: Blob[], id: string) => {
    try {
      const response = await agent.Images.uploadImages(file, id);
      const image = response.data;
      runInAction(() => {
        this.images.push(image);
      });
    } catch (error) {
      console.log(error);
    }
  };
}
