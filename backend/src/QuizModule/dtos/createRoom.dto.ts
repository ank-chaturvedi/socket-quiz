export class CreateRoomDto {
  private name: string;
  private description: string;
  private joinType: string;

  constructor(name: string, description: string, joinType: string) {
    this.name = name;
    this.description = description;
    this.joinType = joinType;
  }

  getName(): string {
    return this.name;
  }

  getDescription(): string {
    return this.description;
  }

  getJoinType(): string {
    return this.joinType;
  }

  toObject() {
    return {
      name: this.name,
      description: this.description,
      joinType: this.joinType,
    };
  }
}
