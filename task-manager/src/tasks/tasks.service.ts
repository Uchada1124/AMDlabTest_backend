import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  // すべてのタスクを取得
  findAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  // タスクを1件取得
  findOne(id: number): Promise<Task | null> {
    return this.taskRepository.findOneBy({ id });
  }

  // 新しいタスクを作成
  create(task: Partial<Task>): Promise<Task> {
    const newTask = this.taskRepository.create(task);
    return this.taskRepository.save(newTask);
  }

  // タスクを更新
  async update(id: number, updatedTask: Partial<Task>): Promise<Task | null> {
    const task = await this.findOne(id);
    if (!task) return null;
    const updated = { ...task, ...updatedTask };
    return this.taskRepository.save(updated);
  }

  // タスクを削除
  async remove(id: number): Promise<boolean> {
    const result = await this.taskRepository.delete(id);
    return (result.affected ?? 0) > 0;
  }  
}
