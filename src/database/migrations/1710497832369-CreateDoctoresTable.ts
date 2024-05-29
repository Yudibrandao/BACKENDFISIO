import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateDoctoresTable1710497679654 implements MigrationInterface {
    
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name:"doctores",
                columns:[
                    {
                        name:"id",
                        type:"int",
                        isPrimary:true,
                        isGenerated:true,
                        generationStrategy:"increment"
                    },
                    {
                        name:"user_id",
                        type:"int",
                    },
                    {
                        name:"especialidad",
                        type:"varchar",
                        length:"20"
                    },
                    {
                        name:"estilo",
                        type:"varchar",
                        length:"50"
                    }
                ],
                foreignKeys:[
                    {
                        columnNames:["user_id"],
                        referencedTableName: "users",
                        referencedColumnNames:["id"]
                    },
                    
                ]
            })
        )
    }


    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("doctores");
    }

}