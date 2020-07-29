import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { StudentEntity } from '../../entities/student.entity';
import { StudentDTO } from './dto/student.dto';
import { QueryStudentInput } from './dto/query-student.input';
import { Op } from 'sequelize';
import { ClassStudentEntity } from 'src/entities/class.entity';

@Injectable()
export class StudentService {
  constructor(
    @Inject('STUDENT_REPOSITORY')
    private readonly studentRepository: typeof StudentEntity,
    @Inject('CLASS_REPOSITORY')
    private readonly classRepository: typeof ClassStudentEntity
  ) {}

  async getAll(filter: QueryStudentInput): Promise<StudentEntity[]> {
    const where = 
    {
        [Op.and]: [
            filter.code ? {'code' : {[Op.iLike] : `%${filter.code}%` }} : {},
            filter.name ? { [Op.or] : 
                [
                    {
                        'first_name' : {[Op.iLike] : `%${filter.name}%` }
                    },
                    {
                        'last_name' : {[Op.iLike] : `%${filter.name}%` }
                    }
                ] 
            } 
            : {},
        ]
    };

    const whereClass = {
        [Op.and]: [
            filter.classId ? {'id' : filter.classId } : {},
        ]
    }
    const orderDefault = [['created_at','DESC']];
    const order = filter.sortBy ? [filter.sortBy, filter.sortType ? filter.sortType : 'DESC'] : [];
    if(order.length > 0)
      orderDefault.push(order);
    return await this.studentRepository.findAll<StudentEntity>({
      offset: filter.page ? filter.page - 1 : 0,
      limit: filter.limit,
      where,
      include: [{
          model: this.classRepository,
          where: whereClass
      }],
      order: JSON.parse(JSON.stringify(orderDefault)),
    });
  }

  async findById(id: number): Promise<StudentEntity> {
    let student = await this.studentRepository.findOne({
      where: {
        id,
      },
    });
    return student;
  }

  async create(data: StudentDTO) {
    const student = await this.studentRepository.create(data);
    return student;
  }

  async update(id: number, data: any, classId: number) {
    try {
      let todo = await this.studentRepository.findOne({
        where: {
          id,
        },
      });
      if (!todo.id) {
        // tslint:disable-next-line:no-console
        // console.error('user doesn\'t exist');
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'Can not found user',
          },
          HttpStatus.NOT_FOUND
        );
      }
      data.classId = classId;
      await this.studentRepository.update(data, { where: { id } });
      return await this.studentRepository.findOne({
        where: {
          id,
        },
      });
    } catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'update database error',
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  async destroy(id: number) {
    await this.studentRepository.destroy({
      where: {
        id,
      },
    });
    return { deleted: true };
  }
}
