using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BookingApp.Migrations
{
    /// <inheritdoc />
    public partial class ChangesInDaos : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Bookings_BookingPlaceId",
                table: "Bookings");

            migrationBuilder.DropColumn(
                name: "End",
                table: "Bookings");

            migrationBuilder.RenameColumn(
                name: "Start",
                table: "Bookings",
                newName: "BookingDate");

            migrationBuilder.AddColumn<string>(
                name: "ReservedFor",
                table: "BookingPlaces",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Bookings_BookingPlaceId",
                table: "Bookings",
                column: "BookingPlaceId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Bookings_BookingPlaceId",
                table: "Bookings");

            migrationBuilder.DropColumn(
                name: "ReservedFor",
                table: "BookingPlaces");

            migrationBuilder.RenameColumn(
                name: "BookingDate",
                table: "Bookings",
                newName: "Start");

            migrationBuilder.AddColumn<DateTime>(
                name: "End",
                table: "Bookings",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.CreateIndex(
                name: "IX_Bookings_BookingPlaceId",
                table: "Bookings",
                column: "BookingPlaceId",
                unique: true);
        }
    }
}
