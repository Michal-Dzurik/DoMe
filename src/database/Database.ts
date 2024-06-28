import TaskModel from '../models/Task.ts';
import {MMKV} from 'react-native-mmkv';
import Category from '../models/Category.ts';
import {DropdownItem} from '../types/DropdownItem.ts';

export class Database {
  private storage: MMKV;

  constructor() {
    this.storage = new MMKV();
  }

  getTasks(): TaskModel[] {
    const jsonTasks = this.storage.getString('Tasks');
    return JSON.parse(<string>jsonTasks);
  }

  updateTask(task: TaskModel): void {
    const tasksArray: TaskModel[] = this.getTasks();

    for (let i = 0; i < tasksArray.length; i++) {
      let oldTask: TaskModel = tasksArray[i];
      if (oldTask.id === task.id) {
        tasksArray[i] = task;
        break;
      }
    }

    const jsonTasks = JSON.stringify(tasksArray);
    this.storage.set('Tasks', jsonTasks);
  }

  storeTasks(tasksArray: TaskModel[]): void {
    const jsonTasks = JSON.stringify(tasksArray);
    this.storage.set('Tasks', jsonTasks);
  }

  addTask(newTask: TaskModel): void {
    const tasks = this.getTasks();
    tasks.push(newTask);
    this.storeTasks(tasks);
  }

  removeTask(taskIdToRemove: number): void {
    let tasks = this.getTasks();
    tasks = tasks.filter((task: TaskModel) => task.id !== taskIdToRemove);
    this.storeTasks(tasks);
  }

  /* ----------------------------
   * ---------CATEGORY-----------
   * ----------------------------
   * */
  storeCategories(categories: Category[]): void {
    const jsonCategories = JSON.stringify(categories);
    this.storage.set('Category', jsonCategories);
  }

  getCategories(): Category[] {
    const jsonCategories = this.storage.getString('Category');
    return JSON.parse(<string>jsonCategories);
  }

  addCategory(title: string): void {
    let categories = this.getCategories();
    const id = categories.length + 1;

    categories.push(new Category({title: title, id: id}));
    this.storeCategories(this.sortCategory(categories));
  }

  removeCategory(id: number): void {
    let categories = this.getCategories();
    categories = categories.filter((category: Category) => category.id !== id);
    this.storeCategories(this.sortCategory(categories));
  }

  getCategoryForPicker(sortAlphabetically: boolean): DropdownItem[] {
    let categories: Category[] = this.getCategories();
    if (sortAlphabetically) {
      categories = this.sortCategory(categories);
    }
    let newCategories = [];

    for (let i = 0; i < categories.length; i++) {
      newCategories.push({
        name: categories[i].title,
        id: categories[i].id,
      });
    }

    return newCategories;
  }

  getCategory(name: string): Category | null {
    let categories: Category[] = this.getCategories();

    for (let i = 0; i < categories.length; i++) {
      if (categories[i].title === name) {
        return categories[i];
      }
    }

    return null;
  }

  sortCategory(categories: Category[]): Category[] {
    return categories.sort((a, b) => {
      const titleA = a.title.toLowerCase();
      const titleB = b.title.toLowerCase();

      if (titleA < titleB) {
        return -1;
      }
      if (titleA > titleB) {
        return 1;
      }
      return 0;
    });
  }
}
