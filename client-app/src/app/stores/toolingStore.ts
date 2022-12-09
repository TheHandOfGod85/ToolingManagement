import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Tooling } from "../layout/models/tooling";
import { v4 as uuid } from "uuid";

export default class ToolingStore {
  toolings: Tooling[] = [];
  singleTooling: Tooling | undefined = undefined;
  loading = false;
  loadingInitial = false;

  constructor() {
    makeAutoObservable(this);
  }

  loadToolings = async () => {
    this.loadingInitial = true;
    try {
      const toolingList = await agent.Toolings.list();
      runInAction(() => {
        this.toolings = toolingList;
        this.loadingInitial = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loadingInitial = false;
      });
    }
  };

  selectTooling = (id: string) => {
    this.singleTooling = this.toolings.find((a) => a.id === id);
  };

  cancelSingleTooling = () => {
    this.singleTooling = undefined;
  };

  createTooling = async (tooling: Tooling) => {
    this.loading = true;
    tooling.id = uuid();
    try {
      await agent.Toolings.create(tooling);
      runInAction(() => {
        this.toolings.push(tooling);
        this.singleTooling = tooling;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  updateTooling = async (tooling: Tooling) => {
    this.loading = true;
    try {
      await agent.Toolings.update(tooling);
      runInAction(() => {
        this.toolings = [
          ...this.toolings.filter((a) => a.id !== tooling.id),
          tooling,
        ];
        this.singleTooling = tooling;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };
}
