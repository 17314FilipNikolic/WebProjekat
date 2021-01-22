using Microsoft.EntityFrameworkCore.Migrations;

namespace Backend.Migrations
{
    public partial class V4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Slide_Pool_PoolID",
                table: "Slide");

            migrationBuilder.AlterColumn<int>(
                name: "PoolID",
                table: "Slide",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Slide_Pool_PoolID",
                table: "Slide",
                column: "PoolID",
                principalTable: "Pool",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Slide_Pool_PoolID",
                table: "Slide");

            migrationBuilder.AlterColumn<int>(
                name: "PoolID",
                table: "Slide",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Slide_Pool_PoolID",
                table: "Slide",
                column: "PoolID",
                principalTable: "Pool",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
