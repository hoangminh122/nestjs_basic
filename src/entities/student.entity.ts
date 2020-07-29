import { Model, Table, Column, DataType, HasMany, BelongsTo, ForeignKey, CreatedAt, UpdatedAt, DeletedAt, Default, IsUUID, PrimaryKey } from "sequelize-typescript"
import { ClassStudentEntity } from "./class.entity";
import { Gender } from "../modules/student/dto/student.enum";
import { UUIDV4, Sequelize } from 'sequelize';

@Table({
    tableName: 'student',
    indexes: [{
        unique: true,
        fields: ['code']
      }] 
})
export class StudentEntity extends Model<StudentEntity> {
    @IsUUID(4)
    @PrimaryKey
    @Column({
      type: DataType.UUID,
      defaultValue: Sequelize.literal('uuid_generate_v4()'),
    })
    id!: string;

    @Column({
        allowNull: false,
        field: 'code'
    })
    code: string;

    @Column({
        allowNull: false,
        field: 'first_name'
    })
    firstName: string;

    @Column({
        allowNull: false,
        field: 'last_name'
    })
    lastName: string;

    @Column({
        field: 'dateOfBirth'
    })
    dateOfBirth: Date;
    

    @Default(Gender.Male)
    @Column({
        type: DataType.ENUM(Gender.Female, Gender.Male),
    })
    gender: Gender;

    @Column({
        // allowNull: false,
        defaultValue:'',
        field: 'address'
    })
    address: string;

    @Column({
        field: 'avatar_id'
    })
    avatarId: string;

    @Column({
        field: 'active'
    })
    active: boolean;

    @ForeignKey(() => ClassStudentEntity)
    @Column({
        field: 'class_id'
    })
    classId: number;

    @CreatedAt
    @Column({ field: 'created_at', type: DataType.DATE })
    public createdAt: Date;

    @UpdatedAt
    @Column({ field: 'updated_at', type: DataType.DATE })
    public updatedAt: Date;

    @DeletedAt
    @Column({ field: 'daleted_at', type: DataType.DATE })
    public deletedAt: Date;
    
    @BelongsTo(() => ClassStudentEntity)
    class: ClassStudentEntity;
    
}