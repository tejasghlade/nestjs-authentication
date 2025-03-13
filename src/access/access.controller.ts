import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AccessService } from './access.service';
import { CreateAccessDto } from './dto/create-access.dto';
import { UpdateAccessDto } from './dto/update-access.dto';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/user/entity/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('access')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AccessController {
  constructor(private readonly accessService: AccessService) {}

  @Post()
  create(@Body() createAccessDto: CreateAccessDto) {
    return this.accessService.create(createAccessDto);
  }

  @Get()
  @Roles(UserRole.ADMIN)
  findAll() {
    // return this.accessService.findAll();
    return 'This is admin only content';
  }

  @Get('user')
  @Roles(UserRole.USER)
  findUser() {
    return 'This is user only content';
  }

  @Get('guest')
  @Roles(UserRole.GUEST)
  findGuest() {
    return 'This is guest only content';
  }

  @Get('admin')
  @Roles(UserRole.ADMIN)
  findAdmin() {
    return 'This is admin only content';
  }

  @Get('public')
  publicRoute() {
    return 'This is accessible to everyone, including guests';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accessService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccessDto: UpdateAccessDto) {
    return this.accessService.update(+id, updateAccessDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accessService.remove(+id);
  }
}
