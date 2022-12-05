import { Schema } from "mongoose";

const MessagesCollection = "messages";

const MessagesSchema = new Schema(
  {
		author: {
			id: { type: String, required: true, max: 100},
			name: { type: String, required: true, max: 100 },
			surname: { type: String, required: true, max: 100},
			age: { type: Number, required: true },
    	price: { type: Number, required: true },
			alias: { type: String, required: true, max: 100 },
    	avatar: { type: String, required: true, max: 100 },
		},
		text: { type: String, required: true, max: 150 }
  },
  {
    virtuals: true,
  }
);

MessagesSchema.set("toJSON", {
  transform: (_, response) => {
    delete response._id;
    return response;
  },
});

export const MessagesModel = { MessagesCollection, MessagesSchema };
