import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common'; //import Get
import { LatihanService } from './latihan.service';

interface payloadDto {
  name: string;
  age: number;
}

interface QueryLatihanDto {
  name?: string;
  age_start?: number;
  age_end?: number;
}

@Controller('latihan') // base url
export class LatihanController {
  constructor(private latihanService: LatihanService) {}

  @Get('/list')
  getLatihan() {
    return this.latihanService.getLatihan();
  }

  @Get()
  findAll(@Query() query: QueryLatihanDto) {
    return {
      method: 'GET',
      query: query,
    };
  }

  @Get('detail/:id')
  findById(@Param('id') id: string) {
    return {
      method: 'GET',
      param: {
        id: id,
      },
    };
  }

  @Post('/create')
  create(@Body() payload: payloadDto) {
    const { name, age } = payload;
    return {
      method: 'POST',
      body: {
        name: name,
        age: age,
      },
    };
  }

  @Put('/update/:id')
  update(@Param('id') id: string, @Body() payload: payloadDto) {
    return {
      method: 'PUT',
      param: {
        id: id,
      },
      body: payload,
    };
  }

  @Delete('delete/:id')
  delete(@Param('id') id: string) {
    return {
      method: 'DELETE',
      param: {
        id: id,
      },
    };
  }
}
