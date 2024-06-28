import Category from './Category.ts';
import TaskModel from './Task.ts';

export default class HomeScreenData {
  public category: Category;
  public tasks: TaskModel[];

  constructor({category, tasks}: {category: any; tasks: any}) {
    this.category = category;
    this.tasks = tasks;
  }
}
