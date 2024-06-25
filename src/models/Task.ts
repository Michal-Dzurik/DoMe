export default class TaskModel {
  public id: number;
  public title: string;
  public description: string;
  public completed: boolean;
  public category: number;

  constructor({
    id,
    title,
    description,
    completed,
    category,
  }: {
    id: any;
    title: any;
    description: any;
    completed: any;
    category: number;
  }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.completed = completed;
    this.category = category;
  }
}
