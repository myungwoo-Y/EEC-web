import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { UpdateApplicationActivation } from './application.dto';
import { ApplicationService } from './application.service';

@Controller('application')
export class ApplicationController {
  constructor(private applicationService: ApplicationService) {}
  
  @Get('/:classId')
  findAll(@Param('classId') classId: number) {
    return this.applicationService.findAll(classId);
  }

  @Put('/active')
  updateActivations(@Body() updateApplicationActivations: UpdateApplicationActivation[]) {
    return this.applicationService.updateActivations(updateApplicationActivations);
  }
}
