import { action, makeObservable, observable } from "mobx";
import clone from "clone";

export abstract class BaseStore<State> {
  protected initialState: State;

  @observable
  public state: State;

  constructor(state: State) {
    this.initialState = clone(state);
    this.state = state;

    makeObservable(this);
  }

  @action
  public resetState(): void {
    this.setStateObject(clone(this.initialState));
  }

  @action
  public setStateObject(state: State): void {
    Object.keys(this.state as any).forEach((key) => {
      const value = state[key as keyof State];
      if (value === undefined) {
        return;
      }
      this.state[key as keyof State] = value;
    });
  }

  @action
  public setState(callback: (state: State) => void) {
    callback(this.state);
  }

  private log(_value: State, _prev: State): void {
    // console.log(
    //   'Previous state:\n',
    //   JSON.parse(JSON.stringify(prev)),
    //   '\nCurrent state:',
    //   JSON.parse(JSON.stringify(value)),
    // );
  }
}
