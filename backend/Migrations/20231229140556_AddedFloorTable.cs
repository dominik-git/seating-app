using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace BookingApp.Migrations
{
    /// <inheritdoc />
    public partial class AddedFloorTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Floor",
                table: "BookingPlaces");

            migrationBuilder.AddColumn<int>(
                name: "FloorId",
                table: "BookingPlaces",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Floors",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    Svg = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Floors", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BookingPlaces_FloorId",
                table: "BookingPlaces",
                column: "FloorId");

            migrationBuilder.AddForeignKey(
                name: "FK_BookingPlaces_Floors_FloorId",
                table: "BookingPlaces",
                column: "FloorId",
                principalTable: "Floors",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BookingPlaces_Floors_FloorId",
                table: "BookingPlaces");

            migrationBuilder.DropTable(
                name: "Floors");

            migrationBuilder.DropIndex(
                name: "IX_BookingPlaces_FloorId",
                table: "BookingPlaces");

            migrationBuilder.DropColumn(
                name: "FloorId",
                table: "BookingPlaces");

            migrationBuilder.AddColumn<string>(
                name: "Floor",
                table: "BookingPlaces",
                type: "text",
                nullable: false,
                defaultValue: "");
        }
    }
}
