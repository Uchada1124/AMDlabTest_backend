import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  // すべてのタスクを取得
  @Get()
  findAll(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  // 新しいタスクを作成
  @Post()
  create(@Body() task: Partial<Task>): Promise<Task> {
    return this.tasksService.create(task);
  }

  // タスクを1件取得
  @Get(':id')
  findOne(@Param('id') id: number): Promise<Task | null> {
    return this.tasksService.findOne(id);
  }

  // タスクを更新
  @Put(':id')
  async update(@Param('id') id: number, @Body() updatedTask: Partial<Task>): Promise<Task | null> {
    return this.tasksService.update(id, updatedTask);
  }

  // タスクを削除
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<{ success: boolean }> {
    const success = await this.tasksService.remove(id);
    return { success };
  }
}
