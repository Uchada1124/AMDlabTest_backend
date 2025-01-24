import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'Title' })
  title: string;

  @Column({ default: 'Todo' })
  status: string; // 'Todo', 'Progress', 'Done'
}
