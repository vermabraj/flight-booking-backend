const { Schema, model } = require("mongoose");

const flightTicketSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    productId: { type: Schema.Types.ObjectId, ref: "product" },

    flightOffers: [String],
    travelers: [
      {
        id: { type: Schema.Types.ObjectId, ref: "product" },
        dateOfBirth: String,
        name: {
          firstName: String,
          lastName: String,
        },
        gender: {
          type: String,
          enum: ["male", "female", "others"],
        },
        contact: {
          email: {
            type: String,
            required: true,
            unique: true,
          },
          phones: [
            {
              deviceType: String,
              countryCallingCode: Number,
              number: Number,
            },
          ],
        },
        documents: [
          {
            documentType: String,
            birthPlace: String,
            issuanceLocation: String,
            issuanceDate: String,
            number: Number,
            expiryDate: String,
            issuanceCountry: String,
            validityCountry: String,
            nationality: String,
            holder: Boolean,
          },
        ],
      },
    ],
  },
  {
    versionKey: false,
  }
);

const flightModel = model("flight-ticket", flightTicketSchema);

module.exports = { flightModel };
