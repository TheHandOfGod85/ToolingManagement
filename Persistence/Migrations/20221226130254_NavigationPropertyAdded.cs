using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class NavigationPropertyAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Images_Toolings_ToolingId",
                table: "Images");

            migrationBuilder.AlterColumn<Guid>(
                name: "ToolingId",
                table: "Images",
                type: "TEXT",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Images_Toolings_ToolingId",
                table: "Images",
                column: "ToolingId",
                principalTable: "Toolings",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Images_Toolings_ToolingId",
                table: "Images");

            migrationBuilder.AlterColumn<Guid>(
                name: "ToolingId",
                table: "Images",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "TEXT");

            migrationBuilder.AddForeignKey(
                name: "FK_Images_Toolings_ToolingId",
                table: "Images",
                column: "ToolingId",
                principalTable: "Toolings",
                principalColumn: "Id");
        }
    }
}
