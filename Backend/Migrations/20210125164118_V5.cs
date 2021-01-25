using Microsoft.EntityFrameworkCore.Migrations;

namespace Backend.Migrations
{
    public partial class V5 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Pool_Park_ParkID",
                table: "Pool");

            migrationBuilder.AlterColumn<int>(
                name: "ParkID",
                table: "Pool",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Pool_Park_ParkID",
                table: "Pool",
                column: "ParkID",
                principalTable: "Park",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Pool_Park_ParkID",
                table: "Pool");

            migrationBuilder.AlterColumn<int>(
                name: "ParkID",
                table: "Pool",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Pool_Park_ParkID",
                table: "Pool",
                column: "ParkID",
                principalTable: "Park",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
