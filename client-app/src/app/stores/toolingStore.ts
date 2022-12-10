import { async } from "q";
import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Tooling } from "../../models/tooling";
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

  loadTooling = async (id: string) => {
    let single = this.getTooling(id);
    if (single) {
      this.singleTooling = single;
      return single;
    } else {
      try {
        single = await agent.Toolings.detail(id);
        this.setTooling(single);
        return single;
      } catch (error) {
        console.log(error);
      }
    }
  };

  private setTooling = (tooling: Tooling) => {
    this.toolings.push(tooling);
  };

  private getTooling = (id: string) => {
    return this.toolings.find((x) => x.id === id);
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
