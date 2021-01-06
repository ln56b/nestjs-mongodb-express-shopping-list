import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://helene:TVjTcb87rsBmPWlg@cluster0.ota9e.mongodb.net/shopping-list?retryWrites=true&w=majority',
      { useNewUrlParser: true, useUnifiedTopology: true },
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
