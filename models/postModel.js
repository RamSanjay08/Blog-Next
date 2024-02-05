//^ Creating Post Model using Mongoose
import { Schema, model, models } from "mongoose";

const postSchema = new Schema(
  {
    title: String,
    description: String,
    image: String,
    created_at: String,
  },
  
  //^ Custom Field in Post Data Start
  { toJSON: { virtuals: true } }
);

postSchema.virtual("short_description").get(function () {
  return this.description.substring(0, 200) + "...";
});
postSchema.virtual("created_at_formatted").get(function () {
  return changeDateFormat(this.created_at);
});

function changeDateFormat(date_str) {
  const date = new Date(date_str);
  const months = [
    "January",
    "Febraury",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "Novomber",
    "December",
  ];
  return `${months[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`
}
//^ Custom Field in Post Data End

const PostModel = models.Post || model("Post", postSchema);

export default PostModel;
