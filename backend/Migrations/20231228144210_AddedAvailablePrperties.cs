using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BookingApp.Migrations
{
    /// <inheritdoc />
    public partial class AddedAvailablePrperties : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "AvailableForBooking",
                table: "BookingPlaces",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "AvailableFrom",
                table: "BookingPlaces",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "AvailableTo",
                table: "BookingPlaces",
                type: "timestamp with time zone",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AvailableForBooking",
                table: "BookingPlaces");

            migrationBuilder.DropColumn(
                name: "AvailableFrom",
                table: "BookingPlaces");

            migrationBuilder.DropColumn(
                name: "AvailableTo",
                table: "BookingPlaces");
        }
    }
}
