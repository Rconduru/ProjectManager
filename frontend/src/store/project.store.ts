import { action } from "mobx";
import { IProjectWithTasks } from "../models/project.model";
import { BaseStore } from "./base.store";

interface IProjectsStore {
  projects: IProjectWithTasks[];
  count: number;
}

class Store extends BaseStore<IProjectsStore> {
  constructor() {
    super({ projects: [], count: 0 });
  }

  @action
  public setProjects = (projects: IProjectWithTasks[]): void => {
    this.setState((state) => (state.projects = projects));
  };

  @action
  public setCount = (count: number): void => {
    this.setState((state) => (state.count = count));
  };
}

export const projectStore = new Store();
