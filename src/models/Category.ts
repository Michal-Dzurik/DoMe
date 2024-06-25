export default class Category {
  public id: number;
  public title: string;

  constructor({id, title}: {id: any; title: any}) {
    this.id = id;
    this.title = title;
  }
}
