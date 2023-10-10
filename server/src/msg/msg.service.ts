import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SolapiMessageService } from 'solapi';
import { SendMessageDto } from './msg.dto';

@Injectable()
export class MsgService {
  solapiMessageService = new SolapiMessageService(
    process.env.SOLAPI_KEY,
    process.env.SOLAPI_SECRET,
  );

  async sendMessage(sendMessageDtos: SendMessageDto[]) {
    return await Promise.all(
      sendMessageDtos.map(async (sendMessageDto) => {
        try {
          await this.solapiMessageService.send(sendMessageDto);
        } catch (e) {
          console.log(e);
          throw new InternalServerErrorException();
        }
      })
    );
  }
}
