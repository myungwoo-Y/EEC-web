import { Body, Controller, Post } from '@nestjs/common';
import { SendMessageDto } from './msg.dto';
import { MsgService } from './msg.service';

@Controller('message')
export class MsgController {
  constructor (private msgService: MsgService) {}

  @Post()
  sendMessage(@Body() sendMessageDto: SendMessageDto[]) {
    return this.msgService.sendMessage(sendMessageDto);
  }
}
