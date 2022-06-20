import type { RecoilState } from 'recoil'
import { atom, selector } from 'recoil'

export type Routes = '/' | '/active' | '/completed'

export interface Todo {
  id: string
  bodyText: string
  completed: boolean
}

export type TodoListType = Todo[]

export interface AppState {
  todoList: TodoListType
}

export enum LocalStorageKey {
  APP_STATE = 'APP_STATE',
}

function LoadAppStateFromLocalStorage(): AppState {
  const stringifiedJSON: string | null = window.localStorage.getItem(
    LocalStorageKey.APP_STATE
  )
  if (typeof stringifiedJSON === 'string') {
    const Loaded: AppState = JSON.parse(stringifiedJSON)
    return Loaded
  }

  const BlankAppState: AppState = {
    todoList: [],
  }

  return BlankAppState
}

export const recoilState: RecoilState<AppState> = atom({
  default: LoadAppStateFromLocalStorage(),
  key: 'appState',
})

export const todoListStatsState = selector({
  key: 'todoListStatsState',
  get: ({get}) => {
    const appState = get(recoilState);
    const totalNum = appState.todoList.length;
    const totalCompletedNum = appState.todoList.filter(item => item.completed).length;
    const totalUncompletedNum = totalNum - totalCompletedNum;
    const percentCompleted =
      totalNum === 0 ? 0 : (totalCompletedNum / totalNum) * 100;

    return {
      totalNum,
      totalCompletedNum,
      totalUncompletedNum,
      percentCompleted,
    };
  },
});
