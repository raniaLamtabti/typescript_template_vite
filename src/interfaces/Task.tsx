interface TaskInterface {
  id: number;
  title: string;
  date: Date;
  time: string;
  isDone: boolean;
  isUrgent: boolean;
  categoryId: number;
}

export default TaskInterface;
