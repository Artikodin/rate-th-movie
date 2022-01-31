import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { CatsService } from './cats/cats.service';
import { MoviesModule } from './movies/movies.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [MoviesModule, CommentsModule],
  controllers: [AppController, CatsController],
  providers: [AppService, CatsService],
})
export class AppModule {}
