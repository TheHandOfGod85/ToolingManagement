import { Tooling } from "../../models/tooling";
import agent from "./agent";

export const getTooling = async (id: string) => {
  const tooling = await agent.Toolings.detail(id);
  return tooling;
};

export const getToolings = async () => {
  const toolings = await agent.Toolings.list();
  return toolings;
};

export const createTooling = async (tooling: Tooling) => {
  return await agent.Toolings.create(tooling);
};

export const deleteTooling = async (id: string) => {
  return await agent.Toolings.delete(id);
};

export const updateTooling = async (tooling: Tooling) => {
  return await agent.Toolings.update(tooling);
};
